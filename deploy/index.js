var argv = require('yargs').argv;

var aws = require('aws-sdk');
var s3 = require('s3');

var ENVIRONMENT = argv.env;
var ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
var SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

if (!ACCESS_KEY_ID) {
	throw 'ACCESS_KEY_ID is empty!';
}

if (!SECRET_ACCESS_KEY) {
	throw 'SECRET_ACCESS_KEY is empty!';
}

switch (ENVIRONMENT) {
	case 'PROD':
		deployProd();
		break;

	case 'BETA':
		deployBeta();
		break;

	default:
		throw 'Env not supported';
}

function getS3Client () {
	return s3.createClient({
		s3Options: {
			accessKeyId: ACCESS_KEY_ID,
			secretAccessKey: SECRET_ACCESS_KEY,
			region: 'us-west-2'
		}
	});
}

function deployBeta () {
	console.log('Deploying beta.gw2armory.com');

	var s3 = getS3Client();
	
	sync(s3, 'beta.gw2armory.com', './dist/');
}

function calculateDaysToSeconds (days) {
	return 3600 * 24 * days;
}

var SHORT_CACHE_FILES = [
	'index.html'
];

Object.freeze(SHORT_CACHE_FILES);

function hasShortCache (file) {
	var result = false;

	SHORT_CACHE_FILES.forEach(function (shortCacheFile) {
		if (file.indexOf(shortCacheFile) >= 0) {
			result = true;
		}
	});

	return result;
}

function sync (s3Client, bucket, folder) {
	console.log('Syncing s3 bucket ' + bucket);

	var DEFAULT_DAYS_TO_CACHE = 365;

	function getS3Params (localFile, stat, callback) {
		var secondsToCache;

		if (hasShortCache(localFile)) {
			secondsToCache = 60;
		} else {
			secondsToCache = calculateDaysToSeconds(DEFAULT_DAYS_TO_CACHE);
		}

	  var s3Params = {
	    CacheControl: 'max-age=' + secondsToCache
	  };

	  callback(null, s3Params);
	}

	var params = {
		localDir: folder,
		deleteRemoved: true,
		s3Params: {
			Bucket: bucket,
			Prefix: ''
		},
		getS3Params: getS3Params 
	};

	var uploader = s3Client.uploadDir(params);
	uploader.on('error', function (err) {
	  console.log("Unable to sync, check your region maybe?");
	  throw err;
	});

	uploader.on('fileUploadStart', function (localFilePath, s3Key) {
	  console.log('Starting upload of ' + localFilePath + ' to ' + bucket + '/' + s3Key);
	});

	uploader.on('fileUploadEnd', function (localFilePath, s3Key) {
	  console.log('Finished upload of ' + bucket + '/' + s3Key);
	});

	uploader.on('end', function () {
	  console.log('Finished sync of s3 bucket ' + bucket);
	});
}
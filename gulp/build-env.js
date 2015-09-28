'use strict';

var path = require('path');
var conf = require('./conf');

var gulp = require('gulp');
var template = require('gulp-template');
var data = require('gulp-data');

var task = function (env_data) {
    return gulp.src(path.join(conf.paths.templates, '/app.env.js'))
		.pipe(data(function () {
            return {
            	env: env_data
            };
        }))
        .pipe(template())
        .pipe(gulp.dest(path.join(conf.paths.generated, '/')));
};

gulp.task('env:dev', function () {
	var env_data = require('../src/environment/local-dev.json');

	return task(env_data);
});

gulp.task('env:staging', function () {
	var env_data = require('../src/environment/staging.json');

	return task(env_data);
});

gulp.task('env:prod', function () {
	var env_data = require('../src/environment/prod.json');

	return task(env_data);
});
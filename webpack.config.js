// https://github.com/petehunt/webpack-howto

var argv = require('yargs').argv;

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var DedupePlugin = webpack.optimize.DedupePlugin;
var NoErrorsPlugin = webpack.NoErrorsPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var VERSION = process.env.TRAVIS_COMMIT || 'local-build';

var ENVIRONMENT = argv.env;
if (!ENVIRONMENT) {
  throw 'WEBPACK_ENV not defined!';
}

var environmentPlugin = new webpack.DefinePlugin({
  __DEV__: ENVIRONMENT.indexOf('DEV') >= 0,
  __PROD__: ENVIRONMENT === 'PROD',
  __VERSION__: JSON.stringify(VERSION),
  __DATE__: JSON.stringify(new Date().toGMTString())
});

var appName = 'bundle';
var localHost = '0.0.0.0';
var localPort = '3040';

var cssLoaderSettings = '';
var imageLoaderSettings = '';

var plugins = [], 
  outputFile;

// https://github.com/ampedandwired/html-webpack-plugin
// minify bug:
// https://github.com/ampedandwired/html-webpack-plugin/pull/81
var htmlConfig = {
  template: './src/index.html',
  inject: 'body',
  favicon: './src/assets/images/favicon.ico'
};

console.log('Gonna get ' + ENVIRONMENT + ' up in here!');

switch (ENVIRONMENT) {
  case 'START:PROD':
  case 'PROD':
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    plugins.push(new DedupePlugin());
    plugins.push(new NoErrorsPlugin());
    outputFile = appName + '.min';
    htmlConfig.minify = {
      removeComments: true,
      collapseWhitespace: true
    };
    htmlConfig.hash = true;
    cssLoaderSettings = 'css?modules&minimize!autoprefixer';
    imageLoaderSettings = 'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}';
    break;

  case 'START:DEV':
  case 'DEV':
  default:
    outputFile = appName;
    htmlConfig.minify = false;
    cssLoaderSettings = 'css?modules!autoprefixer';
    imageLoaderSettings = 'image-webpack';
    break;
}

plugins.push(new ExtractTextPlugin('styles.css'));
plugins.push(new HtmlWebpackPlugin(htmlConfig));
plugins.push(environmentPlugin);

var config = {
  cache: true,
  entry: './src/app/app.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile + '.js',
    publicPath: ''
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/, 
        loader: 'eslint', 
        exclude: /node_modules/
      }
    ],
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loaders: [
          // https://github.com/olov/ng-annotate#library-api
          'ng-annotate',
          'babel?stage=0'
        ]
      },
      {
        // https://github.com/webpack/less-loader
        // https://github.com/webpack/css-loader
        // https://github.com/webpack/style-loader
        test: /\.less$/,
        exclude: /node_modules/, 
        loader: ExtractTextPlugin.extract('style', cssLoaderSettings + '!less')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', cssLoaderSettings)
      },
      {
        // https://github.com/tcoopman/image-webpack-loader
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        exclude: /node_modules/, 
        loaders: [
          'url?limit=20000&name=images/[sha512:hash:base64:7].[ext]',
          imageLoaderSettings
        ]
      },
      { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "url?limit=20000&mimetype=application/font-woff&name=fonts/[sha512:hash:base64:7].[ext]" 
      },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "url?limit=20000&name=fonts/[sha512:hash:base64:7].[ext]" 
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: plugins
};

if (ENVIRONMENT.indexOf('START') >= 0) {
  new WebpackDevServer(webpack(config), {
    contentBase: './dist',
    hot: true,
    debug: true,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
  }).listen(localPort, localHost, function (err, result) {
    if (err) {
      console.log(err);
    }
  });

  var fqdn = 'http://' + (localHost === '0.0.0.0' ? 'localhost' : localHost) + ':' + localPort;

  console.log('-------------------------');
  console.log('Starting webpack server @ ' + fqdn);
  console.log('-------------------------');
}

module.exports = config;
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var DedupePlugin = webpack.optimize.DedupePlugin;
var NoErrorsPlugin = webpack.NoErrorsPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');

// TODO: Get env variables working. Turns out argv doesn't work ;)
var ENVIRONMENT = process.env.WEBPACK_ENV;

var appName = 'bundle';
var localHost = '0.0.0.0';
var localPort = '3030';

var plugins = [], 
  outputFile;

// https://github.com/ampedandwired/html-webpack-plugin
// minify bug:
// https://github.com/ampedandwired/html-webpack-plugin/pull/81
var htmlConfig = {
  template: './src/index.html',
  inject: 'body'
};

switch (ENVIRONMENT) {
  case 'START:PROD':
  case 'PROD':
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    plugins.push(new DedupePlugin());
    plugins.push(new NoErrorsPlugin());
    outputFile = appName + '.min.js';
    htmlConfig.hash = true;
    break;

  case 'DEV':
  default:
    outputFile = appName + '.js';
    htmlConfig.minify = false;
    break;
}

plugins.push(new HtmlWebpackPlugin(htmlConfig));

var config = {
  entry: './src/app/app.module.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    publicPath: ''
  },
  module: {
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
        test: /\.html$/, 
        exclude: /node_modules/, 
        loader: 'html',
      }, 
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          // https://github.com/tcoopman/image-webpack-loader
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: plugins
};

if (ENVIRONMENT === 'DEV' || ENVIRONMENT === 'START:PROD') {
  new WebpackDevServer(webpack(config), {
    contentBase: './dist',
    hot: true,
    debug: true
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
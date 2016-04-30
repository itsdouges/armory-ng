// https://github.com/petehunt/webpack-howto

var argv = require('yargs').argv;

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var autoprefixer = require('autoprefixer');

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

var appName = 'bundle';
var localHost = '0.0.0.0';
var localPort = '3040';
var cssLoaderSettings = '';
var imageLoaderSettings = '';
var plugins = []; 
var outputFile;
var environmentLongName;

var htmlConfig = {
  template: './src/index.html',
  inject: 'body',
  favicon: './src/assets/images/favicon.ico'
};

console.log('Gonna get ' + ENVIRONMENT + ' up in here!');

switch (ENVIRONMENT) {
  case 'START:PROD':
  case 'PROD':
    environmentLongName = 'production';
    devtool = 'source-map';
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    plugins.push(new DedupePlugin());
    plugins.push(new NoErrorsPlugin());
    outputFile = appName + '.min';
    htmlConfig.minify = {
      removeComments: true,
      collapseWhitespace: true
    };
    htmlConfig.hash = true;
    cssLoaderSettings = 'css?modules&minimize&importLoaders=1!postcss';
    imageLoaderSettings = 'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}';
    break;

  case 'START:DEV':
  case 'DEV':
  default:
    environmentLongName = 'development';
    devtool = 'inline-source-map';
    outputFile = appName;
    htmlConfig.minify = false;
    cssLoaderSettings = 'css?modules&importLoaders=1!postcss';
    imageLoaderSettings = 'image-webpack';
    break;
}

var environmentPlugin = new webpack.DefinePlugin({
  __DEV__: ENVIRONMENT.indexOf('DEV') >= 0,
  __PROD__: ENVIRONMENT === 'PROD',
  __VERSION__: JSON.stringify(VERSION.slice(0, 7)),
  __DATE__: JSON.stringify(new Date().toGMTString()),
  'process.env.NODE_ENV': JSON.stringify(environmentLongName)
});

plugins.push(new ExtractTextPlugin('styles.css'));
plugins.push(new HtmlWebpackPlugin(htmlConfig));
plugins.push(environmentPlugin);

var config = {
  cache: true,
  entry: './src/app/app.js',
  devtool: devtool,
  output: {
    path: __dirname + '/dist',
    filename: outputFile + '.js',
    publicPath: ''
  },
  eslint: {
    failOnError: false,
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.js$/, 
    //     loader: 'eslint', 
    //     exclude: /node_modules/
    //   }
    // ],
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loaders: [
          'ng-annotate',
          'babel'
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/, 
        loader: ExtractTextPlugin.extract('style', cssLoaderSettings + '!less')
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style', cssLoaderSettings)
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract('style', 'css?minimize')
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        exclude: /node_modules/, 
        loaders: [
          'url?limit=20000&name=images/[sha512:hash:base64:7].[ext]',
          imageLoaderSettings
        ]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, 
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, 
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      }, 
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      }, 
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ]
  },
  postcss: [autoprefixer],
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: plugins,
  devServer: {
    historyApiFallback: true
  }
};

module.exports = config;
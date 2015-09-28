'use strict';

var path = require('path');
var conf = require('./gulp/conf');
var _ = require('lodash');
var wiredep = require('wiredep');
var webpack = require('webpack');

function listFiles () {
  var wiredepOptions = _.extend({}, conf.wiredep, {
    dependencies: true,
    devDependencies: true
  });

  return wiredep(wiredepOptions)
    .js
    .concat([
      path.join(conf.paths.tmp, '/serve/app/app.module.js'),
      path.join(conf.paths.src, '/**/*.spec.js'),
      path.join(conf.paths.src, '/**/*.mock.js'),
      path.join(conf.paths.src, '/**/*.html')
    ]);
}

module.exports = function (config) {
  var configuration = {
    browsers: ['PhantomJS'],
    files: [
      conf.paths.src + '/**/*.spec.js',
      // conf.paths.src + '/**/*.html',
    ],
    singleRun: true,
    autoWatch: false,
    frameworks: ['jasmine'],
    // ngHtml2JsPreprocessor: {
    //   stripPrefix: 'src/',
    //   moduleName: 'gw2armory'
    // },
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      // 'karma-ng-html2js-preprocessor',
      'karma-webpack'
    ],
    preprocessors: {
      // 'src/**/*.html': ['ng-html2js'],
      'src/**/*.spec.js': ['webpack']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      },
      watch: true
    },
    webpackMiddleware: {
      noInfo: true
    }
  };

  // This block is needed to execute Chrome on Travis
  // If you ever plan to use Chrome and Travis, you can keep it
  // If not, you can safely remove it
  // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
  if (configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
    configuration.customLaunchers = {
      'chrome-travis-ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    };

    configuration.browsers = ['chrome-travis-ci'];
  }

  config.set(configuration);
};

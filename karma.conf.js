var path = require('path');
var webpack = require('webpack');

var webpackConfig = require('./webpack.config');
webpackConfig.devtool = 'inline-source-map';

module.exports = function (config) {
  var configuration = {
    browsers: ['PhantomJS'],
    files: [
      './src/**/*.spec.js'
    ],
    frameworks: ['jasmine'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-webpack'
    ],
    preprocessors: {
      'src/**/*.spec.js': ['webpack']
    },
    webpack: webpackConfig,
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

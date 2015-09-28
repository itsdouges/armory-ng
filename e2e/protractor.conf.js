'use strict';

var paths = require('./gulp/conf').paths;

// An example configuration file.
exports.config = {
  // The address of a running selenium server.
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  //
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome' // todo: firefox/ie/safari/mobiles
  },
  
  baseUrl: 'http://localhost:3030',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: [paths.e2e + '/**/*.spec.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};

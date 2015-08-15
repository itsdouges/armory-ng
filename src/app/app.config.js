'use strict';

function config ($logProvider, $httpProvider) {
  'ngInject';
  
  // Enable log
  $logProvider.debugEnabled(true);

  $httpProvider.interceptors.push('httpAuthInterceptor');
}

export default config;

'use strict';

function config ($logProvider, $httpProvider) {
  'ngInject';
  
  // Enable log
  $logProvider.debugEnabled(true);

  $httpProvider.interceptors.push('armoryApiInterceptor');
}

export default config;

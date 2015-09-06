'use strict';

function config ($logProvider, $httpProvider, env) {
  'ngInject';
  
  $logProvider.debugEnabled(env.verbose);

  $httpProvider.interceptors.push('httpAuthInterceptor');
}

function run () {
  'ngInject';
}

export default {
	config,
	run
}
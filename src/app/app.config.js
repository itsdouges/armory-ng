'use strict';

import axios from 'axios';
import { userAuthSelector } from './selectors/user';

function config ($logProvider, env) {
  $logProvider.debugEnabled(env.verbose);
}

function run ($ngRedux) {
// 	function handle401(rejection) {
// 		if (rejection.config.url.indexOf(env.api.endpoint) === -1) {
// 			return;
// 		}

// 		$injector.get('$state').go('main.no-auth.with-container.login');
// 	}

// 	function handle500(rejection) {
		
// 	}
// 	
	axios.interceptors.request.use((config) => {
		const userAuth = userAuthSelector($ngRedux.getState());
		if (userAuth.token && !config.ignoreAuth) {
			config.headers.Authorization = userAuth.token;
		}

	  return config;
	}, (error) => {
		if (response instanceof Error) {
      // Something happened in setting up the request that triggered an Error (connection issue !)
      console.log('Error', response.message);
    } 

	  // Do something with request error
	  return Promise.reject(error);
	});
}

export default {
	config,
	run
}

// how to run in prod https://docs.angularjs.org/guide/production
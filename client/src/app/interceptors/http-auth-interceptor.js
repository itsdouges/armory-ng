'use strict';

import axios from 'axios';

function HttpAuthInterceptor(env, $q, $injector, $ngRedux) {
	var authService;

	function handle401(rejection) {
		if (rejection.config.url.indexOf(env.api.endpoint) === -1) {
			return;
		}

		$injector.get('$state').go('main.no-auth.with-container.login');
	}

	function handle500(rejection) {
		
	}

	// TODO: Can move this to its own folder and just listen for token change.?
	// TODO: Use selector instead of state directly
	axios.interceptors.request.use((config) => {
		const state = $ngRedux.getState();
		if (state.user.token) {
			config.headers.Authorization = state.user.token;
		}

	  return config;
	}, function (error) {
		// if (response instanceof Error) {
  //     // Something happened in setting up the request that triggered an Error
  //     console.log('Error', response.message);
  //   } 
	  // Do something with request error
	  return Promise.reject(error);
	});

	function handleError(rejection) {

		switch(rejection.status) {
			case 500:
				handle500(rejection);
				return;
			case 401:
				handle401(rejection);
			default:
				return;
		}
	}

	let factory = {
		request: function (config) {
			// TODO: Intercept and attach auth token.
			return config;
		},
		responseError: function (rejection) {
			handleError(rejection);
			return $q.reject(rejection);
		}
	};

	return factory;
}

export default HttpAuthInterceptor;
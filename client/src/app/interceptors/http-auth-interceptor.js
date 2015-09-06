'use strict';

function HttpAuthInterceptor(env, $q, $injector) {
	var authService;

	function handle401(rejection) {
		if (rejection.config.url.indexOf(env.api.endpoint) === -1) {
			return;
		}

		$injector.get('$state').go('main.login');
	}

	function handle500(rejection) {
		
	}

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
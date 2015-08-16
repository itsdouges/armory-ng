'use strict';

function HttpAuthInterceptor(env, $q, $injector) {
	function handleUnauthorizedError(rejection) {
		// todo: use a switch statement ;)

		if (rejection.status === 500) {
			// handle server error
		}

		if (rejection.status === 401) {
			if (rejection.config.url.indexOf(env.api.endpoint) === -1) {
				return;
			}

			$injector.get('$state').go('main.login');
		}
	}

	let factory = {
		'request': function (config) {
			return config;
		},
		'responseError': function (rejection) {
			handleUnauthorizedError(rejection);

			return $q.reject(rejection);
		}
	};

	return factory;
}

export default HttpAuthInterceptor;
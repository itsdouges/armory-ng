'use strict';

function HttpAuthInterceptor(env, $q, $injector) {
	function handleUnauthorizedError(rejection) {
		if (rejection.status !== 401) {
			return;
		}

		if (rejection.config.url.indexOf(env.api.endpoint) === -1) {
			return;
		}

		$injector.get('$state').go('main.login');
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
'use strict';

function ArmoryApiInterceptor(env) {
	let factory = {
		'request': function (config) {
			if (config.url.indexOf(env.api.endpoint) >= 0) {
				if (!config.headers.Authorization || 
					config.headers.Authorization.indexOf('Bearer') === -1) {
					config.headers.Authorization = 'Basic';
				}
			}

			return config;
		}
	};

	return factory;
}

export default ArmoryApiInterceptor;
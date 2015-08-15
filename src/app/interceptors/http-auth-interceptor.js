'use strict';

let hash;

function HttpAuthInterceptor(env) {
	let factory = {
		'request': function (config) {
			return config;
		}
	};

	return factory;
}

export default HttpAuthInterceptor;
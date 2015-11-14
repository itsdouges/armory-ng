var environment = {
	client_name: 'gw2Armory',
	gw2: {
		endpoint: 'https://api.guildwars2.com/'
	}
};

if (__DEV__) {
	environment.api = {
		endpoint: 'http://192.168.59.103/',
		secret: 'bacon'
	};

	environment.penfoldId = '12';
}

if (__PROD__) {
	if (window && window.location.origin.indexOf('beta') >= -1) {
		environment.api = {
			endpoint: 'http://api.beta.gw2armory.com/',
			secret: 'sekritsauce'
		};

		environment.penfoldId = '10';
	} else {
		environment.api = {
			endpoint: 'https://api.gw2armory.com/',
			secret: 'sauce'
		};

		environment.penfoldId = '11';
	}
}

environment.build = {
	date: __DATE__,
	version: __VERSION__
};

export default environment;
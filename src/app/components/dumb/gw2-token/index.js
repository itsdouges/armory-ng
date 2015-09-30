'use strict';

function component () {
	let directive = {
		restrict: 'E',
		controller: Gw2Token,
		controllerAs: 'ctrl',
		scope: {},
		bindToController: {
			token: '=',
			removeToken: '&'
		},
		require: '^userTokens',
		templateUrl: 'app/components/dumb/gw2-token/view.html',
	};

	return directive;
}

class Gw2Token {
	constructor () {

	}
}

export default component;
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
		template: require('./view.html'),
	};

	return directive;
}

class Gw2Token {
	constructor () {

	}
}

export default component;
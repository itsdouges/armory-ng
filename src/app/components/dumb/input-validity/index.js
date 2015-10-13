'use strict';

function component () {
	let directive = {
		restrict: 'E',
		controller: InputValidity,
		controllerAs: 'ctrl',
		bindToController: {
			valid: '=',
			busy: '='
		},
		scope: {},
		template: require('./view.html')
	};

	return directive;
}

class InputValidity {
	constructor () {

	}
}

export default component;
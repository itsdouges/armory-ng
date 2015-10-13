'use strict';

function component () {
	let directive = {
		restrict: 'E',
		controller: ProgressIndicator,
		controllerAs: 'ctrl',
		template: require('./view.html'),
		scope: {},
		bindToController: {
			'busy': '=',
			'size': '@'
		}
	};

	return directive;
}

class ProgressIndicator {
	constructor () {

	}
}

export default component;
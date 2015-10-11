'use strict';

function component () {
	let directive = {
		restrict: 'E',
		controller: SliderControl,
		controllerAs: 'ctrl',
		scope: {},
		bindToController: {
			mode: '@'
		},
		template: require('./view.html'),
	};

	return directive;
}

function SliderControl () {

}

export default component;
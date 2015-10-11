'use strict';

function component () {
	let directive = {
		restrict: 'E',
		controller: InlineCharacters,
		controllerAs: 'ctrl',
		scope: {},
		bindToController: {
			characters: '='
		},
		template: require('./view.html'),
	};

	return directive;
}

function InlineCharacters () {

}

export default component;
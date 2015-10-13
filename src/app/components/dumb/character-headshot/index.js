'use strict';

function component () {
	let directive = {
		restrict: 'E',
		scope: {},
		bindToController: {
			character: '='
		},
		controller: CharacterHeadshot,
		controllerAs: 'ctrl',
		template: require('./view.html'),
	};

	return directive;
}

export class CharacterHeadshot {

}

export default component;
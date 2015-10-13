'use strict';

function component () {
	let directive = {
		restrict: 'E',
		scope: {},
		controller: CharacterPortrait,
		controllerAs: 'ctrl',
		template: require('./view.html'),
		bindToController: {
			character: '='
		}
	};

	return directive;
}

class CharacterPortrait {
	
}

export default component;
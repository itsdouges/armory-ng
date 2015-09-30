'use strict';

function component () {
	let directive = {
		restrict: 'E',
		scope: {},
		controller: CharacterPortrait,
		controllerAs: 'ctrl',
		templateUrl: 'app/components/dumb/character-portrait/view.html',
		bindToController: {
			character: '='
		}
	};

	return directive;
}

class CharacterPortrait {
	
}

export default component;
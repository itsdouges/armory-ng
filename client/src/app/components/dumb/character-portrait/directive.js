'use strict';

function CharacterPortraitDirective() {
	let directive = {
		restrict: 'E',
		scope: {},
		controller: 'CharacterPortraitController',
		controllerAs: 'ctrl',
		templateUrl: 'app/components/dumb/character-portrait/view.html',
		bindToController: {
			character: '='
		}
	};

	return directive;
}

export default CharacterPortraitDirective;
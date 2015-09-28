'use strict';

function CharacterHeadshotDirective () {
	let directive = {
		restrict: 'E',
		scope: {},
		bindToController: {
			character: '='
		},
		controller: CharacterHeadshot,
		controllerAs: 'ctrl',
		templateUrl: 'app/components/dumb/character-headshot/view.html',
	};

	return directive;
}

export class CharacterHeadshot {

}

export default CharacterHeadshotDirective;
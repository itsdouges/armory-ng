'use strict';

function CharacterHeadshotDirective () {
	let directive = {
		restrict: 'E',
		controller: 'CharacterHeadshotController as ctrl',
		scope: {},
		bindToController: {
			character: '='
		},
		templateUrl: 'app/components/dumb/character-headshot/view.html',
	};

	return directive;
}

export default CharacterHeadshotDirective;
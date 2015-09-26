'use strict';

function CharacterViewerDirective() {
	let directive = {
		restrict: 'E',
		scope: {},
		bindToController: {
			mode: '@'
		},
		templateUrl: 'app/components/smart/character-viewer/view.html',
		controller: 'CharacterViewerController as ctrl'
	};

	return directive;
}

export default CharacterViewerDirective;
'use strict';

function CharacterViewerDirective() {
	'ngInject';

	let directive = {
		restrict: 'E',
		scope: {},
		bindToController: {
			mode: '@'
		},
		templateUrl: 'app/components/character-viewer/view.html',
		controller: 'CharacterViewerController as ctrl'
	};

	return directive;
}

export default CharacterViewerDirective;
'use strict';

function CharactersStripDirective () {
	let directive = {
		restrict: 'E',
		controller: 'CharactersStripController as ctrl',
		scope: {},
		bindToController: {
			mode: '@'
		},
		templateUrl: 'app/components/characters-strip/view.html',
	};

	return directive;
}

export default CharactersStripDirective;
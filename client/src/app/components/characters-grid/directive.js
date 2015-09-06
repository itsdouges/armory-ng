'use strict';

function CharactersGridDirective () {
	let directive = {
		restrict: 'E',
		controller: 'CharactersGridController as ctrl',
		scope: {},
		bindToController: {
			mode: '@'
		},
		templateUrl: 'app/components/characters-grid/view.html',
	};

	return directive;
}

export default CharactersGridDirective;
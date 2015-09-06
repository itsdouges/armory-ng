'use strict';

function CharactersGridController (charactersService, $scope) {
	let scope = this;

	function init () {
		if (scope.mode === 'authenticated') {
			charactersService
				.myList()
				.then((characters) => {
					console.log(characters);
					scope.characters = characters;
				});
		}
	}

	this.selectCharacter = (name) => {
		$scope.$emit('char-selected', name);
	};

	init();
}

export default CharactersGridController;
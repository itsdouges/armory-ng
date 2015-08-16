'use strict';

/**
 * CharacterViewerController
 */
function CharacterViewerController(characterService, $stateParams) {
	'ngInject';

	let _error;
	let _loaded;
	let vm = this;

	function init() {
		loadCharacter($stateParams.name);	
	}

	function loadCharacter(name) {
		_error = false;
		_loaded = false;

		characterService
			.readCharacter(name)
			.then(readSuccess, readFailure);
	}

	function readSuccess(character) {
		_loaded = true;
		
		vm.character = character;
	}

	function readFailure(errorMessage) {
		_error = true;

		// TODO: Handle character not found error (404)

		vm.character = null;
	}

	function isLoaded() {
		return _loaded;
	}

	function isError() {
		return _error;
	}

    
	function hasWeaponSwap() {
		return !!vm.character.hasWeaponSwap;
	}

	init();

	vm.loadCharacter = loadCharacter;
	vm.isLoaded = isLoaded;
	vm.isError = isError;
	vm.hasWeaponSwap = hasWeaponSwap;
}

export default CharacterViewerController;
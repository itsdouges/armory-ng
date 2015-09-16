'use strict';

/**
 * CharacterViewerController
 */
function CharacterViewerController(gw2Service, $stateParams, $scope) {
	'ngInject';

	let _error;
	let _loaded;
	let vm = this;

	function init() {
		$scope.$watch(() => {
			return $stateParams.name;
		}, (name) => {
		if (name) {
			loadCharacter(name);
		} else {
			vm.character = {};
			_loaded = false;
		}
		});
	}

	function loadCharacter(name) {
		_error = false;
		_loaded = false;
		vm.busy = true;

		gw2Service
			.readCharacter(name)
			.then(readSuccess, readFailure);
	}

	function readSuccess(character) {
		_loaded = true;

		console.log(character);
		
		vm.character = character;

		vm.busy = false;
	}

	function readFailure(errorMessage) {
		_error = true;

		console.log(errorMessage);

		// TODO: Handle character not found error (404)

		vm.character = null;
		vm.busy = false;
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
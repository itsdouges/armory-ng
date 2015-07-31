/**
 * CharacterViewerController
 */
function CharacterViewerController(characterService, $stateParams, messageService, busyService) {
	'ngInject';

	let _characterService;
	let _messageService;
	let _busyService;

	let _error;
	let _loaded;
	let vm = this;

	function init() {
		_messageService = messageService;
		_characterService = characterService;
		_busyService = busyService;

		loadCharacter($stateParams.name);	
	}

	function loadCharacter(name) {
		_error = false;
		_loaded = false;

		_busyService.setBusy(true);
		_messageService.clear();

		_characterService
			.readCharacter(name)
			.then(readSuccess, readFailure);
	}

	function readSuccess(character) {
		_loaded = true;

		console.log(character);

		vm.character = character;

		_busyService.setBusy(false);
	}

	function readFailure(errorMessage) {
		_error = true;

		vm.character = null;

		if (errorMessage) {
			_messageService.setError(errorMessage);
		}

		_busyService.setBusy(false);
	}

	function isLoaded() {
		return _loaded;
	}

	function isError() {
		return _error;
	}

	init();

	vm.loadCharacter = loadCharacter;
	vm.isLoaded = isLoaded;
	vm.isError = isError;
}

export default CharacterViewerController;
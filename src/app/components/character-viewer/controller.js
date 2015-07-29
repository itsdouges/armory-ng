let currentCharacter;

let _characterService;
let _messageService;
let _busyService;

let readSuccess = function(character) {
	currentCharacter = character;

	_busyService.setBusy(false);
};

let readFailure = function(errorMessage) {
	currentCharacter = null;

	if (errorMessage) {
		_messageService.setError(errorMessage);
	}

	_busyService.setBusy(false);
};

/**
 * CharacterViewerController
 */
class CharacterViewerController {
	constructor(characterService, $stateParams, messageService, busyService) {
		'ngInject';

		_messageService = messageService;
		_characterService = characterService;
		_busyService = busyService;

		this.loadCharacter ($stateParams.name);	
	}

	loadCharacter(name) {
		_busyService.setBusy(true);
		_messageService.clear();

		_characterService
			.readCharacter(name)
			.then(readSuccess, readFailure);	
	}

	currentCharacter() {
		return currentCharacter;
	}
}

export default CharacterViewerController;
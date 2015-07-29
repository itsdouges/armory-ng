let isBusy;
let currentCharacter;

let _characterService;
let _messageService; 

let readSuccess = function(character) {
	isBusy = false;
	currentCharacter = character;
};

let readFailure = function(errorMessage) {
	isBusy = false;
	currentCharacter = null;

	if (errorMessage) {
		_messageService.setError(errorMessage);
	}
};

/**
 * CharacterViewerController
 */
class CharacterViewerController {
	constructor(characterService, $stateParams, messageService) {
		'ngInject';

		_messageService = messageService;
		_characterService = characterService;
		this.loadCharacter ($stateParams.name);	
	}

	loadCharacter(name) {
		isBusy = true;
		_messageService.clear();

		_characterService
			.readCharacter(name)
			.then(readSuccess, readFailure);	
	}

	isBusy() {
		return isBusy;
	}

	currentCharacter() {
		return currentCharacter;
	}
}

export default CharacterViewerController;
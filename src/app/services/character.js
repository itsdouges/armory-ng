let httpService;

class CharacterService {
	constructor($http) {
		'ngInject';

		httpService = $http;
	}

	readCharacter(name) {

	}
}

export default CharacterService;
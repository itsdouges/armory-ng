'use strict';

function CharactersService (env, $http) {
	this.myList = () => {
		return $http
			.get(`${env.api.endpoint}users/me/characters`)
			.then(function (response) {
				return response.data;
			});
	};
}

export default CharactersService;
'use strict';

import axios from 'axios';
import config from '../../../generated/app.env';

export const actions = {
	FETCH_USER_CHARACTERS_RESULT: 'FETCH_USER_CHARACTERS_RESULT',
};

function fetchUserCharactersResult (user, characters) {
	return {
		type: FETCH_USER_CHARACTERS_RESULT,
		payload: {
			user,
			characters
		}
	};
}

function fetchUserCharactersThunk (user) {
	return (dispatch) => {
		return axios
			.get(`${config.api.endpoint}users/me/characters`)
			.then(function (response) {
				dispatch(fetchUserCharactersResult(user, response.data));
			});
	};
}

export const actionCreators = {
	fetchUserCharactersThunk
};
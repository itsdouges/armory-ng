'use strict';

import axios from 'axios';
import config from '../../app.env';

export const actions = {
	FETCH_MY_CHARACTERS_RESULT: 'FETCH_MY_CHARACTERS_RESULT',
};

function fetchMyCharactersResult (characters) {
	return {
		type: actions.FETCH_MY_CHARACTERS_RESULT,
		payload: characters
	};
}

function fetchMyCharactersThunk () {
	return (dispatch) => {
		return axios
			.get(`${config.api.endpoint}users/me/characters`)
			.then(function (response) {
				dispatch(fetchMyCharactersResult(response.data));
			});
	};
}

export const actionCreators = {
	fetchMyCharactersThunk
};
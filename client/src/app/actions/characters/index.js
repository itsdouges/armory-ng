'use strict';

import axios from 'axios';

import config from '../../../generated/app.env';
import gw2Parse from '../../services/gw2/gw2-parse';

export const actions = {
	FETCH_CHARACTER_RESULT: 'FETCH_CHARACTER_RESULT',
	FETCHING_CHARACTER: 'FETCHING_CHARACTER',
	SELECT_CHARACTER: 'SELECT_CHARACTER'
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

function fetchingCharacter (fetching) {
	return {
		type: actions.FETCHING_CHARACTER,
		payload: fetching
	};
}

function fetchCharacterResultSuccess (name, data) {
	return {
		type: actions.FETCH_CHARACTER_RESULT,
		payload: {
			name,
			data
		}
	};
};

function fetchCharacterThunk (character) {
	return (dispatch) => {
		dispatch(fetchingCharacter(true));

		return axios
			.get(`${config.api.endpoint}characters/${character}`)
			.then((response) => {
				dispatch(fetchCharacterResultSuccess(character, response.data));
				dispatch(fetchingCharacter(false));
			});
	};
}

function fetchUserCharactersThunk (user) {
	return (dispatch) => {
		return axios
			.get(`${config.api.endpoint}users/me/characters`)
			.then((response) => {
				let data = gw2Parse.parseCharacter(response.data);
				dispatch(fetchUserCharactersResult(user, data));
			});
	};
}

function selectCharacter (name) {
	return {
		type: actions.SELECT_CHARACTER,
		payload: name
	};
}

export const actionCreators = {
	fetchUserCharactersThunk,
	fetchCharacterThunk,
	selectCharacter
};
'use strict';

import axios from 'axios';

import config from '../../../generated/app.env';
import gw2Parse from '../../services/gw2/gw2-parse';
import * as gw2 from '../gw2-data';

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

// TODO: Action is getting a bit beefy. Refactortractor needed.
function fetchCharacterThunk (character) {
	return (dispatch, getState) => {
		dispatch(fetchingCharacter(true));

		return axios
			.get(`${config.api.endpoint}characters/${character}`)
			.then((response) => {
				let data = gw2Parse.parseCharacter(response.data);
				dispatch(fetchCharacterResultSuccess(character, data));
				
				let state = getState();
				let ids = filterIdsToFetch(state.gw2.skins.data, state.gw2.skins.data, response.data.equipment);

				dispatch(gw2.actionCreators.fetchItemsThunk(ids.items));

				if (ids.skins.length) {
					dispatch(gw2.actionCreators.fetchSkinsThunk(ids.skins));
				}
				
				dispatch(fetchingCharacter(false));
			})
			.catch((hey) => {
				console.log(hey);
			});
	};
}

function filterIdsToFetch (stateItems, stateSkins, equipment) {
	let ids = {
		items: [],
		skins: []
	};

	equipment.forEach((item) => {
		if (item.skin && !stateSkins.hasOwnProperty(item.skin)) {
			ids.skins.push(item.skin);
		}

		if (item.id && !stateItems.hasOwnProperty(item.skin)) {
			ids.items.push(item.id);
		}
	});

	return ids;
}

function fetchUserCharactersThunk (user) {
	return (dispatch) => {
		return axios
			.get(`${config.api.endpoint}users/me/characters`)
			.then((response) => {
				dispatch(fetchUserCharactersResult(user, response.data));
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
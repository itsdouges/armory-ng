'use strict';

import axios from 'axios';

import config from '../../app.env';
import gw2Parse from '../../services/gw2/gw2-parse';
import * as gw2 from '../gw2-data';

export const actions = {
	FETCH_CHARACTER_RESULT: 'FETCH_CHARACTER_RESULT',
	FETCHING_CHARACTER: 'FETCHING_CHARACTER',
	SELECT_CHARACTER: 'SELECT_CHARACTER'
};

export function fetchingCharacter (fetching) {
	return {
		type: actions.FETCHING_CHARACTER,
		payload: fetching
	};
}

export function fetchCharacterResultSuccess (name, data) {
	return {
		type: actions.FETCH_CHARACTER_RESULT,
		payload: {
			name,
			data
		}
	};
};

// TODO: Action is getting a bit beefy. Refactortractor needed.
export function fetchCharacterThunk (character, authenticated) {
	return (dispatch, getState) => {
		dispatch(fetchingCharacter(true));

		let url = authenticated ? `${config.api.endpoint}users/me/characters/${character}` : `${config.api.endpoint}characters/${character}`;

		return axios
			.get(url)
			.then((response) => {
				let data = gw2Parse.parseCharacter(response.data);
				dispatch(fetchCharacterResultSuccess(character, data));
				dispatch(fetchingCharacter(false));
				
				let state = getState();
				let ids = filterIdsToFetch(state, response.data);

				if (ids.items.length) {
					dispatch(gw2.actionCreators.fetchItemsThunk(ids.items));
				}

				if (ids.skins.length) {
					dispatch(gw2.actionCreators.fetchSkinsThunk(ids.skins));
				}

				if (ids.specializations.length) {
					dispatch(gw2.actionCreators.fetchSpecializationsThunk(ids.specializations));
				}
			})
			.catch((hey) => {
				console.log(hey);
			});
	};
}

export function filterIdsToFetch (state, character) {
	let ids = {
		items: [],
		skins: [],
		specializations: []
	};

	let currentItems = state.gw2.items.data;
	let currentSkins = state.gw2.skins.data;
	let currentSpecializations = state.gw2.specializations.data;

	for (let gameMode in character.specializations) {
		if (!character.specializations.hasOwnProperty(gameMode)) {
			continue;
		}

		character.specializations[gameMode].forEach((specialization) => {
			if (!specialization) {
				return;
			}

			if (!currentSpecializations.hasOwnProperty(specialization.id) && ids.specializations.indexOf(specialization.id) === -1) {
				ids.specializations.push(specialization.id);
			}
		});
	}

	character.equipment.forEach((item) => {
		if (item.skin && !currentSkins.hasOwnProperty(item.skin)) {
			ids.skins.push(item.skin);
		}

		if (!currentItems.hasOwnProperty(item.id)) {
			ids.items.push(item.id);

			if (item.upgrades) {
				ids.items = ids.items.concat(item.upgrades);
			}
		}
	});

	return ids;
}

export function fetchUserCharactersThunk (user) {
	return (dispatch) => {
		return axios
			.get(`${config.api.endpoint}users/me/characters`)
			.then((response) => {
				dispatch(fetchUserCharactersResult(user, response.data));
			});
	};
}

export function selectCharacter (name) {
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

export default actionCreators;
"use strict";

import { actions } from '../../actions/user/characters';

function fetchMyCharactersReducer (state, action) {
	let newState = {
		...state
	};

	newState.characters = action.payload;

	return newState;
};

function fetchingMyCharactersReducer (state, action) {
	let newState = {
		...state
	};

	newState.fetching = action.payload;

	return newState;
};

export function charactersReducer (state, action) {
	switch (action.type) {
		case actions.FETCH_MY_CHARACTERS_RESULT:
			return fetchMyCharactersReducer(state, action);

		case actions.FETCHING_MY_CHARACTERS:
			return fetchingMyCharactersReducer(state, action);

		default:
			return state;
	}
}
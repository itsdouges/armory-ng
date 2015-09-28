"use strict";

import { actions } from '../../actions/user/characters';

function fetchMyCharactersReducer (state, action) {
	let newState = {
		...state
	};

	newState.characters = action.payload;

	return newState;
};

export function charactersReducer (state, action) {
	switch (action.type) {
		case actions.FETCH_MY_CHARACTERS_RESULT:
			return fetchMyCharactersReducer(state, action);

		default:
			return state;
	}
}
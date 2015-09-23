"use strict";

import { actions } from '../../actions/characters';

function fetchCharactersReducer (state, action) {
	let newState = {
		...state
	};

	if (action.payload.user === 'me') {
		newState
	}

	let user = ? 
		'me' : 
		action.payload.user;

	newState 

	return newState;
};

export default function reducer (state, action) {
	switch (action.type) {
		case actions.FETCH_USER_CHARACTERS_RESULT:
			return fetchCharactersReducer(state, action);

		default:
			return state;
	}
}
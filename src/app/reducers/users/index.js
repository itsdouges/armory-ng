"use strict";

import { actions } from '../../actions/users';

function fetchingUser (state, action) {
	let newState = {
		...state
	};

	newState.fetching = action.payload;

	return newState;
}

function fetchingUserCharacters (state, action) {
	let newState = {
		...state
	};

	newState.fetchingCharacters = action.payload;

	return newState;
}

function fetchingUserResult (state, action) {
	let newState = {
		...state
	};

	newState.data[action.payload.alias] = action.payload;

	return newState;
}

function fetchingUserCharactersResult (state, action) {
	let newState = {
		...state
	};

	if (!newState.data[action.payload.alias]) {
		newState.data[action.payload.alias] = {};
	}

	newState.data[action.payload.alias].characters = action.payload.characters;

	return newState;
}

let initialState = {
	data: {}
};

export default function reducer (state = initialState, action) {
	switch (action.type) {
		case actions.FETCHING_USER:
			return fetchingUser(state, action);

		case actions.FETCHING_USER_RESULT:
			return fetchingUserResult(state, action);

		case actions.FETCHING_USER_CHARACTERS_RESULT:
			return fetchingUserCharactersResult(state, action);

		case actions.FETCHING_USER_CHARACTERS:
			return fetchingUserCharacters(state, action);

		default:
			return state;
	}
}
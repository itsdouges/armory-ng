"use strict";

import { actions } from '../../actions/characters';

function fetchCharactersReducer (state, action) {
	let newState = {
		...state
	};

	newState.data[action.payload.name] = action.payload.data;

	return newState;
};

function fetchingCharacterReducer (state, action) {
	let newState = {
		...state
	};

	newState.fetching = action.payload;

	return newState;
}

function selectCharacterReducer (state, action) {
	let newState = {
		...state
	};

	newState.selected = action.payload;

	return newState;
}

const initalState = {
	data: {}
};

export default function reducer (state = initalState, action) {
	switch (action.type) {
		case actions.FETCH_CHARACTER_RESULT:
			return fetchCharactersReducer(state, action);

		case actions.FETCHING_CHARACTER:
			return fetchingCharacterReducer(state, action);

		case actions.SELECT_CHARACTER:
			return selectCharacterReducer(state, action);

		default:
			return state;
	}
}
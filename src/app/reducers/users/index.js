"use strict";

import { actions } from '../../actions/users';

function fetchingUser (state, action) {
	let newState = {
		...state
	};

	newState.fetching = action.payload;

	return newState;
}

function fetchingUserResult (state, action) {
	let newState = {
		...state
	};

	newState.data[action.payload.alias] = action.payload;

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

		default:
			return state;
	}
}
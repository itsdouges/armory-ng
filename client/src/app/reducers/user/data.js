'use strict';

import { actions } from '../../actions/user/data';

function fetchingGw2TokensReducer (state, action) {
	let newState = {
		...state
	};

	newState.fetchingTokens = action.payload;

	return newState;
}

function fetchGw2TokensReducer (state, action) {
	let newState = {
		...state
	};

	newState.gw2Tokens = action.payload;

	return newState;
}

function validatingGw2TokenReducer (state, action) {
	let newState = {
		...state
	};

	newState.validatingGw2Token = action.payload;

	return newState;
}

function validateGw2TokenResultReducer (state, action) {
	let newState = {
		...state
	};

	newState.validGw2Token = !action.error;

	return newState;
}

export function dataReducer (state, action) {
	switch (action.type) {
		case actions.FETCHING_GW2_TOKENS:
			return fetchingGw2TokensReducer(state, action);

		case actions.FETCH_GW2_TOKEN_RESULT: 
			return fetchGw2TokensReducer(state, action);

		case actions.VALIDATING_GW2_TOKEN:
			return validatingGw2TokenReducer(state, action);

		case actions.VALIDATE_GW2_TOKEN_RESULT:
			return validateGw2TokenResultReducer(state, action);

		default:
			return state;
	}
}
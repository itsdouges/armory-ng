"use strict";

import { actions } from '../actions/guilds';

function fetchingGuild (state, action) {
	let newState = {
		...state
	};

	newState.fetching = action.payload;

	return newState;
}

function selectGuild (state, action) {
	let newState = {
		...state
	};

	newState.selected = action.payload;

	return newState;
}

function fetchGuildResult (state, action) {
	let newState = {
		...state
	};

	newState.data[action.payload.name] = action.payload.data;

	return newState;
}

const initial = {
	data: {}
};

export default function reducer (state = initial, action) {
	switch (action.type) {
		case actions.FETCHING_GUILD:
			return fetchingGuild(state, action);

		case actions.SELECT_GUILD:
			return selectGuild(state, action);
		
		case actions.FETCH_GUILD_RESULT:
			return fetchGuildResult(state, action);

		default:
			return state;
	}
}
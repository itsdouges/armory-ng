"use strict";

import { actions } from '../../actions/gw2-data';

function fetchingItemsReducer (state, action) {
	let newState = {
		...state
	};

	newState.items.fetching = action.payload;

	return newState;
}

function fetchingSkinsReducer (state, action) {
	let newState = {
		...state
	};

	newState.skins.fetching = action.payload;

	return newState;
}

function fetchItemsResultReducer (state, action) {
	let newState = {
		...state
	};

	newState.items.data = {
		...newState.items.data,
		...action.payload
	};

	return newState;
}

function fetchSkinsResultReducer (state, action) {
	let newState = {
		...state
	};

	newState.skins.data = {
		...newState.skins.data,
		...action.payload
	};

	return newState;
}

// TODO: Persist data to.. somewhere.
const initalState = {
	items: {
		data: {}
	},
	skins: {
		data: {}
	}
};

export default function reducer (state = initalState, action) {
	switch (action.type) {
		case actions.FETCHING_ITEMS:
			return fetchingItemsReducer(state, action);

		case actions.FETCHING_SKINS:
			return fetchingSkinsReducer(state, action);

		case actions.FETCH_ITEMS_RESULT:
			return fetchItemsResultReducer(state, action);

		case actions.FETCH_SKINS_RESULT:
			return fetchSkinsResultReducer(state, action);

		default:
			return state;
	}
}
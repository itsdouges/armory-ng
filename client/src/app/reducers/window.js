"use strict";

import { actions } from '../actions/window';

function setColumnSizeReducer (state, action) {
	let newState = {
		...state
	};

	newState.columns = action.payload;

	return newState;
};

function setSpacerHeightReducer (state, action) {
	let newState = {
		...state
	};

	newState.spacerHeight = action.payload;

	return newState;
}

export default function reducer (state = {}, action) {
	switch (action.type) {
		case actions.SET_WINDOW_COLUMN_SIZE:
			return setColumnSizeReducer(state, action);

		case actions.SET_BOTTOM_SPACER:
			return setSpacerHeightReducer(state, action);

		default:
			return state;
	}
}
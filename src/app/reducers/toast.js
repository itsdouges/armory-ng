"use strict";

import { actions } from '../actions/toast';

function setToatReducer (state, action) {
	let newState = action.payload;
	return newState;
}

export default function reducer (state = {}, action) {
	switch (action.type) {
		case actions.SHOW_TOAST:
			return setToatReducer(state, action);

		default:
			return state;
	}
}
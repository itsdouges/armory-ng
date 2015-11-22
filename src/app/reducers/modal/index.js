"use strict";

import { actions } from '../../actions/modal';

function showModal (state, action) {
	let newState = {
		show: action.payload
	};

	return newState;
}

const initialState = {
	show: false
};

export default function reducer (state = initialState, action) {
	switch (action.type) {
		case actions.SHOW_MODAL:
			return showModal(state, action);

		default:
			return state;
	}
}
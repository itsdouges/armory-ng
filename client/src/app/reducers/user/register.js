'use strict';

import { actions } from '../../actions/user/register';

function registeringUserReducer (state, action) {
	let newState = {
		...state
	};

	console.log('lmao');

	newState.registering = action.payload;

	return newState;
}

function registeringUserResultReducer (state, action) {

}

export function registerReducer (state, action) {
	switch (action.type) {
		case actions.REGISTERING_USER:
			return registeringUserReducer(state, action);

		case actions.REGISTER_USER_RESULT: 
			return registeringUserResultReducer(state, action);

		default:
			return state;
	}
}
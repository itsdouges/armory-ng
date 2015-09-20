'use strict';

import { actions } from '../../actions/user';

import { registerReducer } from './register';
import { validatorReducer } from './validators';
import { authReducer } from './auth';

const initialState = {
	token: localStorage.getItem('USER_TOKEN_LOCALSTORAGE_KEY')
};

// Keep the state flat, makes things easier.
export default function reduce (state = initialState, action) {
	switch(action.type) {
		case actions.INVALIDATE_EMAIL:
		case actions.VALIDATE_EMAIL_RESULT:
		case actions.VALIDATING_EMAIL:
		case actions.INVALIDATE_ALIAS: 
		case actions.VALIDATE_ALIAS_RESULT:
		case actions.VALIDATING_ALIAS:
		case actions.VALIDATE_PASSWORDS:
			return validatorReducer(state, action);

		case actions.REGISTERING_USER:
		case actions.REGISTER_USER_RESULT:
			return registerReducer(state, action);

		case actions.FETCHING_TOKEN:
		case actions.FETCH_TOKEN_RESULT:
		case actions.CLEAR_USER_DATA:
		case actions.AUTHENTICATE_USER:
			return authReducer(state, action);

		default:
			return state;
	}
}
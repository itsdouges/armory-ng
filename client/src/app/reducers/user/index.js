'use strict';

import { actions } from '../../actions/user';

import { registerReducer } from './register';
import { validatorReducer } from './validators';
import { authReducer } from './auth';
import { dataReducer } from './data';
import { charactersReducer } from './characters';

const initialState = {
	token: localStorage.getItem('USER_TOKEN_LOCALSTORAGE_KEY')
};

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

		case actions.VALIDATING_GW2_TOKEN:
		case actions.VALIDATE_GW2_TOKEN_RESULT:
		case actions.REMOVE_GW2_TOKEN:
		case actions.ADDING_GW2_TOKEN:
		case actions.ADD_GW2_TOKEN_RESULT:
		case actions.FETCH_GW2_TOKEN_RESULT:
		case actions.FETCHING_GW2_TOKENS:
		case actions.INVALIDATE_GW2_TOKEN:
			return dataReducer(state, action);

		case actions.FETCH_MY_CHARACTERS_RESULT:
			return charactersReducer(state, action);

		default:
			return state;
	}
}
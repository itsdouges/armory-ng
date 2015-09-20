'use strict';

import { actions } from '../../actions/user/validators';

function invalidateEmail (userState) {
	let newUserState = {
		...userState,
		emailValid: false
	};

	return newUserState;
}

function validateEmailResultReducer (userState, action) {
	let newUserState = {
		...userState
	};

	if (action.error) {
		newUserState.emailErrors = action.payload;
	} else {
		newUserState.emailValue = action.payload;
		newUserState.emailErrors = undefined;
	}

	newUserState.emailValid = !action.error;

	return newUserState;
}

function validatingEmailReducer (userState, action) {
	let newUserState = {
		...userState,
		emailValidating: action.payload
	};

	return newUserState;
}

function invalidateAlias (userState) {
	let newUserState = {
		...userState,
		aliasValid: false
	};

	return newUserState;
}

function validateAliasResultReducer (userState, action) {
	let newUserState = {
		...userState
	};

	if (action.error) {
		newUserState.aliasErrors = action.payload;
	} else {
		newUserState.aliasValue = action.payload;
		newUserState.emailErrors = undefined;
	}

	newUserState.aliasValid = !action.error;

	return newUserState;
}

function validatingAliasReducer (userState, action) {
	let newUserState = {
		...userState,
		aliasValidating: action.payload
	};

	return newUserState;
}

function validatePasswordsReducer (userState, action) {
	let newUserState = {
		...userState
	};

	if (action.error) {
		newUserState.passwordErrors = action.payload;
		newUserState.passwordValue = undefined;
	} else {
		newUserState.passwordErrors = undefined;
		newUserState.passwordValue = action.payload;
	}

	return newUserState;
}

export function validatorReducer (state, action) {
	switch(action.type) {
		case actions.INVALIDATE_EMAIL:
			return invalidateEmail(state);

		case actions.VALIDATE_EMAIL_RESULT:
			return validateEmailResultReducer(state, action);

		case actions.VALIDATING_EMAIL:
			return validatingEmailReducer(state, action);

		case actions.INVALIDATE_ALIAS: 
			return invalidateAlias(state);

		case actions.VALIDATE_ALIAS_RESULT:
			return validateAliasResultReducer(state, action);

		case actions.VALIDATING_ALIAS:
			return validatingAliasReducer(state, action);

		case actions.VALIDATE_PASSWORDS:
			return validatePasswordsReducer(state, action);

		default:
			return state;
	}
}
'use strict';

import axios from 'axios'

import config from '../../app.env';

export const actions = {
	INVALIDATE_EMAIL: 'INVALIDATE_EMAIL',
	VALIDATE_EMAIL_RESULT: 'VALIDATE_EMAIL_RESULT',
	VALIDATING_EMAIL: 'VALIDATING_EMAIL',
	INVALIDATE_ALIAS: 'INVALIDATE_ALIAS',
	VALIDATE_ALIAS_RESULT: 'VALIDATE_ALIAS_RESULT',
	VALIDATING_ALIAS: 'VALIDATING_ALIAS',
	VALIDATE_PASSWORDS: 'VALIDATE_PASSWORDS'
};

function validatingEmail (validating) {
	return {
		type: actions.VALIDATING_EMAIL,
		payload: validating
	};
}

function validateEmailSuccess (email) {
	return {
		type: actions.VALIDATE_EMAIL_RESULT,
		payload: email
	};
}

function validateEmailError (error) {
	return {
		type: actions.VALIDATE_EMAIL_RESULT,
		payload: error,
		error: true
	};
}

function invalidateEmail () {
	return {
		type: actions.INVALIDATE_EMAIL
	};
}

function validateEmailThunk (email) {
	return (dispatch) => {
		dispatch(validatingEmail(true));

		return axios.get(`${config.api.endpoint}users/check/email/${email}`)
		.then(() => {
			dispatch(validateEmailSuccess(email));
			dispatch(validatingEmail(false));
		}, (response) => {
			dispatch(validateEmailError(response.data));
			dispatch(validatingEmail(false));
		});
	}; 
}

function invalidateAlias () {
	return {
		type: actions.INVALIDATE_ALIAS
	};
}

function validatingAlias (validating) {
	return {
		type: actions.VALIDATING_ALIAS,
		payload: validating
	};
}

function checkAliasSuccess (alias) {
	return {
		type: actions.VALIDATE_ALIAS_RESULT,
		payload: alias
	};
}

function checkAliasError (error) {
	return {
		type: actions.VALIDATE_ALIAS_RESULT,
		payload: error,
		error: true
	};
}

function checkAliasThunk (alias) {
	return (dispatch) => {
		if (!alias) {
			dispatch(invalidateAlias());

			return;
		}

		dispatch(validatingAlias(true));

		return axios.get(`${config.api.endpoint}users/check/alias/${alias}`)
		.then(() => {
			dispatch(checkAliasSuccess(alias));
			dispatch(validatingAlias(false));
		}, (response) => {
			dispatch(checkAliasError(response.data));
			dispatch(validatingAlias(false));
		});
	}; 
}

function checkPasswordsSuccess (password) {
	return {
		type: actions.VALIDATE_PASSWORDS,
		payload: password
	};
}

function checkPasswordsFailure (errors) {
		return {
			type: actions.VALIDATE_PASSWORDS,
			payload: errors,
			error: true
		};
}

function checkPasswords (password1, password2) {
	let isStrong = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password1);
	let passwordsMatch = password1 === password2;

	let errors = [];

	if (!isStrong) {
		errors.push('Your password should be greater than or equal to 8 characters long, and contain one or more uppercase, lowercase, numeric, and special character.')
	}

	if (!passwordsMatch) {
		errors.push('Make your passwords match!');
	}

	if (errors.length) {
		return checkPasswordsFailure(errors);
	}

	return checkPasswordsSuccess(password1);
};

export const actionCreators = {
	checkPasswords,
	checkAliasThunk,
	validateEmailThunk,
	invalidateAlias,
	invalidateEmail
};
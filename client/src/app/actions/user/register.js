'use strict';

import axios from 'axios';

import * as hmm from 'redux-ui-router';
console.log(hmm);

import * as authActions from './auth';
import config from '../../../generated/app.env';

export const actions = {
	REGISTERING_USER: 'REGISTERING_USER',
	REGISTER_USER_RESULT: 'REGISTER_USER_RESULT'
};

function isRegistering (registering) {
	return {
		type: actions.REGISTERING_USER,
		payload: !!registering
	};
}

function registerResultSuccess () {
	return {
		type: actions.REGISTER_USER_RESULT
	};
}

function registerResultError (message) {
	return {
		type: actions.REGISTER_USER_RESULT,
		payload: message,
		error: true
	};
}

function registerThunk (user) {
	return (dispatch) => {
		dispatch(isRegistering(true));

		let mappedUser = {
			alias: user.aliasValue,
			email: user.emailValue,
			password: user.passwordValue
		};

		return axios
			.post(`${config.api.endpoint}users`, mappedUser)
			.then(() => {
				dispatch(registerResultSuccess());
				dispatch(authActions.actionCreators.fetchTokenThunk(mappedUser.email, mappedUser.password));
			}, (response) => {
				dispatch(registerResultError(response.data));
				dispatch(isRegistering(false));
			});
	};
}

export const actionCreators = {
	isRegistering,
	registerThunk
};
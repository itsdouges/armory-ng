'use strict';

import axios from 'axios';

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
				console.log('success bro');
				dispatch(isRegistering(false));

				// redirect
			});
	};
}

export const actionCreators = {
	isRegistering,
	registerThunk
};
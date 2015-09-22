'use strict';

import axios from 'axios';
import stateGo from 'redux-ui-router/lib/state-go';

import config from '../../../generated/app.env';

import showToast from '../toast'; 

const LOCAL_USER_TOKEN_KEY = 'gw2armoryuser_TOKEN';

export const actions = {
	FETCHING_TOKEN: 'FETCHING_TOKEN',
	AUTHENTICATE_USER: 'AUTHENTICATE_USER',
	FETCH_TOKEN_RESULT: 'FETCH_TOKEN_RESULT',
	CLEAR_USER_DATA: 'CLEAR_USER_DATA'
};

function fetchTokenSuccess (token) {
	return {
		type: actions.FETCH_TOKEN_RESULT,
		payload: token
	};
}

function authenticateUser (user) {
	return {
		type: actions.AUTHENTICATE_USER,
		payload: user
	};
}

function fetchingToken (fetching) {
	return {
		type: actions.FETCHING_TOKEN,
		payload: !!fetching
	};
}

function clearUserData () {
	return {
		type: actions.CLEAR_USER_DATA
	};
}

function fetchTokenThunk (email, password) {
	return (dispatch) => {
		dispatch(fetchingToken(true));

		return axios
			.post(`${config.api.endpoint}token`, {
				username: email,
				password: password,
				grant_type: 'password'
			}, {
				headers: {
					Authorization: 'Basic ' + config.api.token
				}
			})
			.then((response) => {
				let combinedToken = `${response.data.token_type} ${response.data.access_token}`;

				dispatch(fetchTokenSuccess(combinedToken));
				dispatch(stateGo('main.with-auth.characters'));
				dispatch(fetchingToken(false));
			}, (response) => {
				dispatch(showToast(response.data.error_description));
				dispatch(fetchingToken(false));
			});
	};
}

export const actionCreators = {
	fetchTokenThunk,
	clearUserData,
	authenticateUser
};
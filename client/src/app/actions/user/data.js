'use strict';

import axios from 'axios';

import config from '../../../generated/app.env';

export const actions = {
	FETCHING_GW2_TOKENS: 'FETCHING_GW2_TOKENS',
	FETCH_GW2_TOKEN_RESULT: 'FETCH_GW2_TOKEN_RESULT',

	ADDING_GW2_TOKEN: 'ADDING_GW2_TOKEN',
	ADD_GW2_TOKEN_RESULT: 'ADD_GW2_TOKEN_RESULT',

	DELETING_GW2_TOKEN: 'DELETING_GW2_TOKEN',
	DELETE_GW2_TOKEN_RESULT: 'DELETE_GW2_TOKEN_RESULT',

	VALIDATING_GW2_TOKEN: 'VALIDATING_GW2_TOKEN',
	VALIDATE_GW2_TOKEN_RESULT: 'VALIDATE_GW2_TOKEN_RESULT'
};

function fetchingGw2Tokens (fetching) {
	return {
		type: actions.FETCHING_GW2_TOKENS,
		payload: !!fetching
	};
}

function fetchGw2TokensSuccess (tokens) {
	return {
		type: actions.FETCH_GW2_TOKEN_RESULT,
		payload: tokens
	};
}

function addingGw2Token (adding) {
	return {
		type: actions.ADDING_GW2_TOKEN,
		payload: !!adding
	};
}

function addGw2TokenResultSuccess (token) {
	return {
		type: actions.ADD_GW2_TOKEN_RESULT,
		payload: token
	};
}

function validateGw2TokenResultSuccess () {
	return {
		type: actions.VALIDATE_GW2_TOKEN_RESULT
	};
}

function validateGw2TokenResultError () {
	return {
		type: actions.VALIDATE_GW2_TOKEN_RESULT,
		error: true
	};
}

function validatingGw2Token (validating) {
	return {
		type: actions.VALIDATING_GW2_TOKEN,
		payload: !!validating
	};
}

function validateGw2TokenThunk (token) {
	return (dispatch) => {
		dispatch(validatingGw2Token(true));

		return axios
			.get(`${config.api.endpoint}users/check/gw2-token/${token}`)
			.then(() => {
				dispatch(validateGw2TokenResultSuccess());
				dispatch(validatingGw2Token(false));
			}, () => {
				dispatch(validateGw2TokenResultError());
				dispatch(validatingGw2Token(false));
			});
	};
}

function addGw2TokenThunk (token) {
	return (dispatch) => {
		dispatch(addingGw2Token(true));

		return axios
			.post(`${config.api.endpoint}users/me/gw2-tokens`, {
				token: token
			})
			.then(() => {
				dispatch(addGw2TokenResultSuccess(token));
				dispatch(addingGw2Token(false));
			});
	};
}

function fetchGw2TokensThunk () {
	return (dispatch) => {
		dispatch(fetchingGw2Tokens(true));

		return axios
			.get(`${config.api.endpoint}users/me/gw2-tokens`)
			.then((response) => {
				dispatch(fetchGw2TokensSuccess(response.data));
				dispatch(fetchingGw2Tokens(false));
			});
		};
}

export const actionCreators = {
	fetchGw2TokensThunk,
	addGw2TokenThunk,
	validateGw2TokenThunk
};
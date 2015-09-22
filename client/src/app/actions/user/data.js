'use strict';

import axios from 'axios';

import config from '../../../generated/app.env';
import showToast from '../toast';

export const actions = {
	FETCHING_GW2_TOKENS: 'FETCHING_GW2_TOKENS',
	FETCH_GW2_TOKEN_RESULT: 'FETCH_GW2_TOKEN_RESULT',

	ADDING_GW2_TOKEN: 'ADDING_GW2_TOKEN',
	ADD_GW2_TOKEN_RESULT: 'ADD_GW2_TOKEN_RESULT',

	REMOVE_GW2_TOKEN: 'REMOVE_GW2_TOKEN',

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

function validateGw2TokenResultError (message) {
	return {
		type: actions.VALIDATE_GW2_TOKEN_RESULT,
		error: true,
		payload: message
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
			}, (response) => {
				dispatch(showToast(response.data[0]));
				dispatch(validateGw2TokenResultError(response.data));
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
			.then((response) => {
				// TODO: Update backend to return token data.
				dispatch(showToast('Added token!'));
				dispatch(addGw2TokenResultSuccess(response.data));
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

function removeGw2Token (token) {
	return {
		type: actions.REMOVE_GW2_TOKEN,
		payload: token
	};
}

function removeGw2TokenThunk (token) {
	return (dispatch) => {
		dispatch(removeGw2Token(token));

		return axios
			.delete(`${config.api.endpoint}users/me/gw2-tokens/${token}`)
			.then((response) => {
				dispatch(showToast('Removed token!'));
			});
	};
}

export const actionCreators = {
	fetchGw2TokensThunk,
	addGw2TokenThunk,
	validateGw2TokenThunk,
	removeGw2TokenThunk
};
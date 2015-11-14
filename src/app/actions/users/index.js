import axios from 'axios';
import config from '../../app.env';

export const actions = {
	FETCHING_USER: 'FETCHING_USER',
	FETCHING_USER_CHARACTERS: 'FETCHING_USER_CHARACTERS',
	FETCHING_USER_RESULT: 'FETCHING_USER_RESULT',
	FETCHING_USER_CHARACTERS_RESULT: 'FETCHING_USER_CHARACTERS_RESULT'
};

function fetchingUser (fetching) {
	return {
		type: actions.FETCHING_USER,
		payload: fetching
	};
}

function fetchUserResult (user) {
	return {
		type: actions.FETCHING_USER_RESULT,
		payload: user
	};
};

function fetchUserCharactersResult (alias, characters) {
	return {
		type: actions.FETCHING_USER_CHARACTERS_RESULT,
		payload: {
			alias,
			characters
		}
	};
};

function fetchingUserCharacters (fetching) {
	return {
		type: actions.FETCHING_USER_CHARACTERS,
		payload: fetching
	};
}

function fetchUserCharactersThunk (alias) {
	return (dispatch) => {
		dispatch(fetchingUserCharacters(true));

		return axios
			.get(`${config.api.endpoint}users/${alias}/characters`)
			.then((response) => {
				dispatch(fetchUserCharactersResult(alias, response.data));
				dispatch(fetchingUserCharacters(false));
			});
	};
}

function fetchUserThunk (alias) {
	return (dispatch) => {
		dispatch(fetchingUser(true));

		return axios
			.get(`${config.api.endpoint}users/${alias}`)
			.then((response) => {
				dispatch(fetchUserResult(response.data));
				dispatch(fetchingUser(false));
			});
	};
}

export const actionCreators = {
	fetchUserThunk,
	fetchUserCharactersThunk
};

export default actionCreators;
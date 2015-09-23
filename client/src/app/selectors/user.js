import { createSelector } from 'reselect';

const getUser = state => state.user;
const getUserToken = state => state.user.token;
const getUserLoggedIn = state => state.user.loggedIn;
const getCanRegister = state => state.user.aliasValid && state.user.emailValid && state.user.passwordValue;
const getMyCharacters = state => state.user.characters;
const getHasCharacters = state => {
	let has = !state.user.characters || !state.user.characters.length;

	return !has;
};

const getColumns = state => state.window.columns;

export const userAuthSelector = createSelector(
	getUserToken,
	getUserLoggedIn,
	(token, loggedIn) => {
		return {
			token,
			loggedIn
		};
	}
);

export const registerSelector = createSelector(
	getUser,
	getCanRegister,
	(user, canRegister) => {
		return {
			user,
			canRegister
		};
	}
);

export const userDataSelector = createSelector(
	getUser,
	(user) => {
		return {
			user
		};
	}
);

export const myCharactersSelector = createSelector(
	getMyCharacters,
	getHasCharacters,
	getColumns,
	(characters, hasCharacters, columns) => {
		return {
			characters,
			hasCharacters,
			columns
		};
	}
);
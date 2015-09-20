import { createSelector } from 'reselect';

const userSelector = state => state.user;
const canRegisterSelector = state => state.user.aliasValid && state.user.emailValid && state.user.passwordValue;

export const registerSelector = createSelector(
	userSelector,
	canRegisterSelector,
	(user, canRegister) => {
		return {
			user,
			canRegister
		};
	}
);
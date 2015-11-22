import { createSelector } from 'reselect';

const getUsers = state => state.users;
const getMe = state => state.user;

export const usersSelector = createSelector(
	getMe,
	getUsers,
	(me, users) => {
		return {
			users,
			me
		};
	}
);
import { createSelector } from 'reselect';

const getUsers = state => state.users;
const getMe = state => state.user;
const getPvpSeasons = state => state.gw2.pvpSeasons;

export const usersSelector = createSelector(
  getMe,
  getUsers,
  getPvpSeasons,
  (me, users, pvpSeasons) => {
    return {
      users,
      me,
      pvpSeasons,
    };
  }
);

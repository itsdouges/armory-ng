import { createSelector } from 'reselect';

const currentGuild = state => state.guilds.data[state.guilds.selected];

export const guildsSelector = createSelector(
	currentGuild,
	(guild) => {
		return {
			guild
		};
	}
);
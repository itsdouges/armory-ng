import axios from 'axios';
import config from '../../app.env';

export const actions = {
	FETCHING_GUILD: 'FETCHING_GUILD',
	SELECT_GUILD: 'SELECT_GUILD',
	FETCH_GUILD_RESULT: 'FETCH_GUILD_RESULT'
};

function fetchingGuild (fetching) {
	return {
		type: actions.FETCHING_GUILD,
		payload: fetching
	};
}

function selectGuild (name) {
	return {
		type: actions.SELECT_GUILD,
		payload: name
	};
}

function fetchGuildResult (name, data) {
	return {
		type: actions.FETCH_GUILD_RESULT,
		payload: {
			name,
			data
		}
	};
}

function fetchGuildThunk (name) {
	return (dispatch) => {
		dispatch(fetchingGuild(true));

		return axios
			.get(`${config.api.endpoint}guilds/${name}`)
			.then((response) => {
				dispatch(fetchGuildResult(name, response.data));
				dispatch(fetchingGuild(false));
			});
	};
}

export default {
	fetchGuildThunk,
	fetchingGuild,
	selectGuild
};
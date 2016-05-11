import axios from 'axios';
import config from '../../app.env';

export const actions = {
  FETCHING_USER: 'FETCHING_USER',
  FETCHING_USER_CHARACTERS: 'FETCHING_USER_CHARACTERS',
  FETCHING_USER_RESULT: 'FETCHING_USER_RESULT',
  FETCHING_USER_CHARACTERS_RESULT: 'FETCHING_USER_CHARACTERS_RESULT',
  FETCH_PVP_STATS_RESULT: 'FETCH_PVP_STATS_RESULT',
  FETCH_PVP_GAMES_RESULT: 'FETCH_PVP_GAMES_RESULT',
  FETCH_PVP_STANDINGS_RESULT: 'FETCH_PVP_STANDINGS_RESULT',
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


export function fetchPvpStatsSuccess (alias, data) {
  return {
    type: actions.FETCH_PVP_STATS_RESULT,
    payload: {
      alias,
      data
    }
  };
}

export function fetchPvpGamesSuccess (alais, data) {
  return {
    type: actions.FETCH_PVP_GAMES_RESULT,
    payload: {
      alias,
      data
    }
  };
}

export function fetchPvpStandingsSuccess (alias, data) {
  return {
    type: actions.FETCH_PVP_STANDINGS_RESULT,
    payload: {
      alias,
      data
    }
  };
}

export function fetchPvpStatsThunk (alias) {
  return (dispatch) => {
    return axios
      .get(`${config.api.endpoint}users/${alias}/pvp/stats`)
      .then((response) => {
        dispatch(fetchPvpStatsSuccess(alias, response.data));
      });
    };
}

export function fetchPvpGamesThunk (alias) {
  return (dispatch) => {
    return axios
      .get(`${config.api.endpoint}users/${alias}/pvp/games`)
      .then((response) => {
        dispatch(fetchPvpGamesSuccess(alias, response.data));
      });
    };
}

export function fetchPvpStandingsThunk (alias) {
  return (dispatch) => {
    return axios
      .get(`${config.api.endpoint}users/${alias}/pvp/standings`)
      .then((response) => {
        dispatch(fetchPvpStandingsSuccess(alias, response.data));
      });
    };
}

export const actionCreators = {
  fetchUserThunk,
  fetchUserCharactersThunk
};

export default actionCreators;
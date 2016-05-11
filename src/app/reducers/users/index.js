import { actions } from '../../actions/users';

// TODO: Fix. This reducer is terrible.

function fetchingUser (state, action) {
  const newState = {
    ...state
  };

  newState.fetching = action.payload;

  return newState;
}

function fetchingUserCharacters (state, action) {
  const newState = {
    ...state
  };

  newState.fetchingCharacters = action.payload;

  return newState;
}

function fetchingUserResult (state, action) {
  const newState = {
    ...state
  };

  if (!newState.data[action.payload.alias]) {
    newState.data[action.payload.alias] = {};
  }

  newState.data[action.payload.alias] = {
    ...newState.data[action.payload.alias],
    ...action.payload,
  };

  return newState;
}

function fetchingUserCharactersResult (state, action) {
  const newState = {
    ...state
  };

  if (!newState.data[action.payload.alias]) {
    newState.data[action.payload.alias] = {};
  }

  newState.data[action.payload.alias].characters = action.payload.characters;

  return newState;
}

function fetchPvpStatsResult (state, action) {
  const newState = {
    ...state
  };

  if (!newState.data[action.payload.alias]) {
    newState.data[action.payload.alias] = {};
  }

  newState.data[action.payload.alias].pvpStats = action.payload.data;

  return newState;
}

function fetchPvpStandingsResult (state, action) {
  const newState = {
    ...state
  };

  if (!newState.data[action.payload.alias]) {
    newState.data[action.payload.alias] = {};
  }

  newState.data[action.payload.alias].pvpStandings = action.payload.data;

  return newState;
}

function fetchPvpGamesResult (state, action) {
  const newState = {
    ...state
  };

  if (!newState.data[action.payload.alias]) {
    newState.data[action.payload.alias] = {};
  }

  newState.data[action.payload.alias].pvpGames = action.payload.data;

  return newState;
}

const initialState = {
  data: {}
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case actions.FETCHING_USER:
      return fetchingUser(state, action);

    case actions.FETCHING_USER_RESULT:
      return fetchingUserResult(state, action);

    case actions.FETCHING_USER_CHARACTERS_RESULT:
      return fetchingUserCharactersResult(state, action);

    case actions.FETCHING_USER_CHARACTERS:
      return fetchingUserCharacters(state, action);

    case actions.FETCH_PVP_STATS_RESULT:
      return fetchPvpStatsResult(state, action);

    case actions.FETCH_PVP_GAMES_RESULT:
      return fetchPvpGamesResult(state, action);

    case actions.FETCH_PVP_STANDINGS_RESULT:
      return fetchPvpStandingsResult(state, action);

    default:
      return state;
  }
}

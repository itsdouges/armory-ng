import { actions } from '../../actions/user/auth';
import { setWhoIAm } from '../../services/who-am-i';

const USER_TOKEN_LOCALSTORAGE_KEY = 'USER_TOKEN_LOCALSTORAGE_KEY';

function fetchTokenResultReducer (state, action) {
  let newState = {
    ...state
  };

  newState.token = action.payload;
  localStorage.setItem(USER_TOKEN_LOCALSTORAGE_KEY, action.payload);

  return newState;
}

function fetchingTokenReducer (state, action) {
  let newState = {
    ...state
  };

  newState.fetchingToken = !!action.payload;

  return newState;
}

function clearUserDataReducer (state) {
  let newState = {
    ...state
  };

  newState = {};
  localStorage.removeItem(USER_TOKEN_LOCALSTORAGE_KEY);

  return newState;
}

function authenticateUserReducer (state, action) {
  const newState = {
    ...state,
    ...action.payload
  };

  setWhoIAm(action.payload.alias);

  newState.loggedIn = true;

  return newState;
}

export function authReducer (state, action) {
  switch (action.type) {
    case actions.FETCH_TOKEN_RESULT:
      return fetchTokenResultReducer(state, action);

    case actions.FETCHING_TOKEN:
      return fetchingTokenReducer(state, action);

    case actions.CLEAR_USER_DATA: 
      return clearUserDataReducer(state);

    case actions.AUTHENTICATE_USER:
      return authenticateUserReducer(state, action);

    default:
      return state;
  }
}
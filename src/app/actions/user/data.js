import axios from 'axios';
import config from '../../app.env';
import showToast from '../toast';

export const actions = {
  FETCHING_GW2_TOKENS: 'FETCHING_GW2_TOKENS',
  FETCH_GW2_TOKEN_RESULT: 'FETCH_GW2_TOKEN_RESULT',

  SELECT_PRIMARY_TOKEN: 'SELECT_PRIMARY_TOKEN',
  ADDING_GW2_TOKEN: 'ADDING_GW2_TOKEN',
  ADD_GW2_TOKEN_RESULT: 'ADD_GW2_TOKEN_RESULT',

  REMOVE_GW2_TOKEN: 'REMOVE_GW2_TOKEN',

  INVALIDATE_GW2_TOKEN: 'INVALIDATE_GW2_TOKEN',
  VALIDATING_GW2_TOKEN: 'VALIDATING_GW2_TOKEN',
  VALIDATE_GW2_TOKEN_RESULT: 'VALIDATE_GW2_TOKEN_RESULT',

  FETCHING_ME: 'FETCHING_ME',
  FETCHING_ME_RESULT: 'FETCHING_ME_RESULT',

  CHANGE_PASSWORD_RESULT: 'CHANGE_PASSWORD_RESULT',
  CHANGING_PASSWORD: 'CHANGING_PASSWORD'
};

function changingPassword (changing) {
  return {
    type: actions.CHANGING_PASSWORD,
    payload: !!changing
  };
}

function changePasswordThunk (currentPassword, password) {
  return (dispatch) => {
    dispatch(changingPassword(true));

    return axios
      .put(`${config.api.endpoint}users/me/password`, {
        password: password,
        currentPassword: currentPassword
      })
      .then(() => {
        dispatch(showToast('Your password has been updated successfully!'));
        dispatch(changingPassword(false));
      }, (response) => {
        dispatch(showToast('Sorry your current password is different!'));
        dispatch(changingPassword(false));
      });
  };
}

function fetchingGw2Tokens (fetching) {
  return {
    type: actions.FETCHING_GW2_TOKENS,
    payload: !!fetching
  };
}

function fetchGw2TokensSuccess (tokens) {
  return {
    type: actions.FETCH_GW2_TOKEN_RESULT,
    payload: tokens
  };
}

function addingGw2Token (adding) {
  return {
    type: actions.ADDING_GW2_TOKEN,
    payload: !!adding
  };
}

function addGw2TokenResultSuccess (token) {
  return {
    type: actions.ADD_GW2_TOKEN_RESULT,
    payload: token
  };
}

function validateGw2TokenResultSuccess () {
  return {
    type: actions.VALIDATE_GW2_TOKEN_RESULT
  };
}

function validateGw2TokenResultError (message) {
  return {
    type: actions.VALIDATE_GW2_TOKEN_RESULT,
    error: true,
    payload: message
  };
}

function validatingGw2Token (validating) {
  return {
    type: actions.VALIDATING_GW2_TOKEN,
    payload: !!validating
  };
}

function validateGw2TokenThunk (token) {
  return (dispatch) => {
    dispatch(validatingGw2Token(true));

    return axios
      .get(`${config.api.endpoint}users/check/gw2-token/${token}`)
      .then(() => {
        dispatch(validateGw2TokenResultSuccess());
        dispatch(validatingGw2Token(false));
      }, (response) => {
        dispatch(showToast(response.data[0]));
        dispatch(validateGw2TokenResultError(response.data));
        dispatch(validatingGw2Token(false));
      });
  };
}

function addGw2TokenThunk (token) {
  return (dispatch) => {
    dispatch(addingGw2Token(true));

    return axios
      .post(`${config.api.endpoint}users/me/gw2-tokens`, {
        token: token
      })
      .then((response) => {
        dispatch(showToast('Nice! You\'ve added a token.'));
        dispatch(addGw2TokenResultSuccess(response.data));
        dispatch(invalidateGw2Token());
        dispatch(addingGw2Token(false));
      });
  };
}

function fetchGw2TokensThunk () {
  return (dispatch) => {
    dispatch(fetchingGw2Tokens(true));

    return axios
      .get(`${config.api.endpoint}users/me/gw2-tokens`)
      .then((response) => {
        dispatch(fetchGw2TokensSuccess(response.data));
        dispatch(fetchingGw2Tokens(false));
      });
    };
}

function removeGw2Token (token) {
  return {
    type: actions.REMOVE_GW2_TOKEN,
    payload: token
  };
}

function invalidateGw2Token () {
  return {
    type: actions.INVALIDATE_GW2_TOKEN
  };
}

function removeGw2TokenThunk (token) {
  return (dispatch) => {
    dispatch(removeGw2Token(token));

    return axios
      .delete(`${config.api.endpoint}users/me/gw2-tokens/${token}`)
      .then((response) => {
        dispatch(showToast('Your token has been removed!'));
      });
  };
}

function fetchingMe (fetching) {
  return {
    type: actions.FETCHING_ME,
    payload: fetching
  };
}

function fetchMeResult (user) {
  return {
    type: actions.FETCHING_ME_RESULT,
    payload: user
  };
};

function fetchMeThunk () {
  return (dispatch) => {
    dispatch(fetchingMe(true));

    return axios
      .get(`${config.api.endpoint}users/me`)
      .then((response) => {
        dispatch(fetchMeResult(response.data));
        dispatch(fetchingMe(false));
      });
  };
}

function selectPrimaryTokenThunk (token) {
  return (dispatch) => {
    dispatch(selectPrimaryToken(token));
    return axios.put(`${config.api.endpoint}users/me/gw2-tokens/${token}/set-primary`);
  };
}

function selectPrimaryToken (token) {
  return {
    type: actions.SELECT_PRIMARY_TOKEN,
    payload: token,
  };
}

export const actionCreators = {
  fetchGw2TokensThunk,
  addGw2TokenThunk,
  validateGw2TokenThunk,
  removeGw2TokenThunk,
  invalidateGw2Token,
  fetchMeThunk,
  changePasswordThunk,
  selectPrimaryToken,
  selectPrimaryTokenThunk,
};

export default actionCreators;
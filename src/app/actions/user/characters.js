'use strict';

import axios from 'axios';
import config from '../../app.env';

export const actions = {
    FETCH_MY_CHARACTERS_RESULT: 'FETCH_MY_CHARACTERS_RESULT',
    FETCHING_MY_CHARACTERS: 'FETCHING_MY_CHARACTERS'
};

function fetchMyCharactersResult (characters) {
    return {
        type: actions.FETCH_MY_CHARACTERS_RESULT,
        payload: characters
    };
}

function fetchingMyCharacters (fetching) {
    return {
        type: actions.FETCHING_MY_CHARACTERS,
        payload: fetching
    };
}

function fetchMyCharactersThunk () {
    return (dispatch) => {
        dispatch(fetchingMyCharacters(true));

        return axios
            .get(`${config.api.endpoint}users/me/characters`)
            .then(function (response) {
                dispatch(fetchMyCharactersResult(response.data));
                dispatch(fetchingMyCharacters(false));
            });
    };
}

export const actionCreators = {
    fetchMyCharactersThunk
};
"use strict";

import { actions } from '../../actions/search';

const initialState = {
    searching: false,
    term: '',
    results: []
};

function searching (state, action) {
    let newState = {
        ...state
    };

    newState.results = [];
    newState.searching = action.payload.busy;
    newState.term = action.payload.term || newState.term;

    return newState;
}

function searchResult (state, action) {
    let newState = {
        ...state
    };

    newState.searching = false;
    newState.results = action.payload;

    return newState;
}

function clearSearch (state, action) {
    return initialState;
}

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case actions.SEARCHING:
            return searching(state, action);

        case actions.SEARCH_RESULT:
            return searchResult(state, action);

        case actions.CLEAR_SEARCH:
            return clearSearch(state, action);

        default:
            return state;
    }
}
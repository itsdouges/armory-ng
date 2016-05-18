'use strict';

import { actions } from '../../actions/user/register';

function registeringUserReducer (state, action) {
    let newState = {
        ...state
    };

    newState.registering = action.payload;

    return newState;
}

function registeringUserResultReducer (state, action) {
    let newState = {
        ...state
    };

    if (action.error) {
        newState.registerErrors = action.payload;
    } else {
        newState.registerErrors = undefined;
        newState.registerSuccess = true;
    }

    return newState;
}

export function registerReducer (state, action) {
    switch (action.type) {
        case actions.REGISTERING_USER:
            return registeringUserReducer(state, action);

        case actions.REGISTER_USER_RESULT: 
            return registeringUserResultReducer(state, action);

        default:
            return state;
    }
}
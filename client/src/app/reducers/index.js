'use strict';

import { combineReducers } from 'redux';
import { router } from 'redux-ui-router';
import user from './user/';

const rootReducer = combineReducers({
	user,
	router
});

export default rootReducer;
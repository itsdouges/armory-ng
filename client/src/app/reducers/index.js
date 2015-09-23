'use strict';

import { combineReducers } from 'redux';
import { router } from 'redux-ui-router';
import user from './user/';
import wndow from './window';

const rootReducer = combineReducers({
	user,
	router,
	window: wndow
});

export default rootReducer;
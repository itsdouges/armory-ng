'use strict';

import { combineReducers } from 'redux';
import { router } from 'redux-ui-router';
import user from './user/';
import wndow from './window';
import characters from './characters';

const rootReducer = combineReducers({
	user,
	router,
	window: wndow,
	characters
});

export default rootReducer;
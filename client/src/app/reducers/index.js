'use strict';

import { combineReducers } from 'redux';
import { router } from 'redux-ui-router';
import user from './user/';
import wndow from './window';
import characters from './characters';
import gw2 from './gw2-data';

const rootReducer = combineReducers({
	user,
	router,
	window: wndow,
	characters,
	gw2
});

export default rootReducer;
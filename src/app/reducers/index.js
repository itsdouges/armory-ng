'use strict';

import { combineReducers } from 'redux';
import { router } from 'redux-ui-router';
import user from './user/';
import _window from './window';
import characters from './characters';
import gw2 from './gw2-data';
import toast from './toast';
import users from './users';
import guilds from './guilds';

const rootReducer = combineReducers({
	user,
	router,
	window: _window,
	characters,
	gw2,
	toast,
	users,
	guilds
});

export default rootReducer;
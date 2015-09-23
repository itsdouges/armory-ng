'use strict';

import * as validator from './validators';
import * as register from './register';
import * as auth from './auth';
import * as data from './data';
import * as characters from './characters';

export const actions = {
	...validator.actions,
	...register.actions,
	...auth.actions,
	...data.actions,
	...characters.actions
};

export const actionCreators = {
	...validator.actionCreators,
	...register.actionCreators,
	...auth.actionCreators,
	...data.actionCreators,
	...characters.actionCreators
};
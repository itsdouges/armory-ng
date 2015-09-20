'use strict';

import * as validator from './validators';
import * as register from './register';
import * as auth from './auth';

export const actions = {
	...validator.actions,
	...register.actions,
	...auth.actions
};

export const actionCreators = {
	...validator.actionCreators,
	...register.actionCreators,
	...auth.actionCreators
};
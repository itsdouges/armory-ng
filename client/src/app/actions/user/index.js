'use strict';

import * as validator from './validators';
import * as register from './register';

export const actions = {
	...validator.actions
};

export const actionCreators = {
	...validator.actionCreators
};
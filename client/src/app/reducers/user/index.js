'use strict';

import * as validator from '../../actions/user';
import { reduceValidator } from './validators';

// Keep the state flat, makes things easier.
export default function reduce (state = {}, action) {
	switch(action.type) {
		case validator.actions.INVALIDATE_EMAIL:
		case validator.actions.VALIDATE_EMAIL_RESULT:
		case validator.actions.VALIDATING_EMAIL:
		case validator.actions.INVALIDATE_ALIAS: 
		case validator.actions.VALIDATE_ALIAS_RESULT:
		case validator.actions.VALIDATING_ALIAS:
		case validator.actions.VALIDATE_PASSWORDS:
			return reduceValidator(state, action);

		default:
			return state;
	}
}
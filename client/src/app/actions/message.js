'use strict';

export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

export function showMessage (message) {
	return {
		type: SHOW_MESSAGE,
		payload: message
	};
}

export function clearMessage () {
	return {
		type: CLEAR_MESSAGE
	};
}
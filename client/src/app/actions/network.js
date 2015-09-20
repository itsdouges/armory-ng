import actions from 'redux-actions';

export const CONNECTIVITY_ISSUE = 'CONNECTIVITY_ISSUE';
export const GENERAL_SERVER_ERROR = 'GENERAL_SERVER_ERROR';

export function connectivityIssue() {
	return {
		type: CONNECTIVITY_ISSUE,
		payload: true
	};
}

export function generalServerError() {
	return {
		type: GENERAL_SERVER_ERROR
	}
}
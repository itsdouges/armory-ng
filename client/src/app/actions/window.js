export const actions = {
	SET_WINDOW_COLUMN_SIZE: 'SET_WINDOW_COLUMN_SIZE'
};

function setColumnSize (size) {
	return {
		type: actions.SET_WINDOW_COLUMN_SIZE,
		payload: size
	};
}

export const actionCreators = {
	setColumnSize
};
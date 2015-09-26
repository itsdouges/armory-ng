export const actions = {
	SET_WINDOW_COLUMN_SIZE: 'SET_WINDOW_COLUMN_SIZE',
	SET_BOTTOM_SPACER: 'SET_BOTTOM_SPACER'
};

function setColumnSize (size) {
	return {
		type: actions.SET_WINDOW_COLUMN_SIZE,
		payload: size
	};
}

function setBottomSpacer (pixels) {
	return {
		type: actions.SET_BOTTOM_SPACER,
		payload: `${pixels}px`
	};
};

export const actionCreators = {
	setColumnSize,
	setBottomSpacer
};
import { createSelector } from 'reselect';

const getModalShown = state => state.modal.show;

const selector = createSelector(
	getModalShown,
	(show) => {
		return {
			show
		};
	}
);

export default selector;
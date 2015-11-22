import { createSelector } from 'reselect';

const getSearch = state => state.search;

const selector = createSelector(
	getSearch,
	(search) => {
		return {
			search
		};
	}
);

export default selector;
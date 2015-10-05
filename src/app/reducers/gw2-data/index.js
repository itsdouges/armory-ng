"use strict";

import { actions } from '../../actions/gw2-data';

function fetchingItemsReducer (state, action) {
	let newState = {
		...state
	};

	newState.items.fetching = action.payload;

	return newState;
}

function fetchingSkinsReducer (state, action) {
	let newState = {
		...state
	};

	newState.skins.fetching = action.payload;

	return newState;
}

function fetchingSpecializationsReducer (state, action) {
	let newState = {
		...state
	};

	newState.specializations.fetching = action.payload;

	return newState;
}

function fetchingTraitsReducer (state, action) {
	let newState = {
		...state
	};

	newState.traits.fetching = action.payload;

	return newState;
}

function fetchItemsResultReducer (state, action) {
	let newState = {
		...state
	};

	newState.items.data = {
		...newState.items.data,
		...action.payload
	};

	return newState;
}

function fetchSkinsResultReducer (state, action) {
	let newState = {
		...state
	};

	newState.skins.data = {
		...newState.skins.data,
		...action.payload
	};

	return newState;
}

function fetchTraitsResultReducer (state, action) {
	let newState = {
		...state
	};

	newState.traits.data = {
		...newState.traits.data,
		...action.payload
	};

	return newState;
}

function fetchSpecializationsResultReducer (state, action) {
	let newState = {
		...state
	};

	newState.specializations.data = {
		...newState.specializations.data,
		...action.payload
	};

	return newState;
}

function showTooltipReducer (state, action) {
	let newState = {
		...state
	};

	if (!action.payload.show) {
		newState.tooltip = {
			open: action.payload.show
		};
	} else {
		newState.tooltip = {
			open: action.payload.show,
			item: action.payload.item,
			skin: action.payload.skin,
			upgrades: action.payload.upgrades,
			type: action.payload.type,
			upgrade_combo_count: action.payload.upgrade_combo_count
		};
	}

	return newState;
}

// TODO: Persist data to.. somewhere.
const initalState = {
	items: {
		data: {}
	},
	skins: {
		data: {}
	},
	traits: {
		data: {}
	},
	specializations: {
		data: {}
	},
	tooltip: {
		open: false
	}
};

export default function reducer (state = initalState, action) {
	switch (action.type) {
		case actions.FETCHING_ITEMS:
			return fetchingItemsReducer(state, action);

		case actions.FETCHING_SKINS:
			return fetchingSkinsReducer(state, action);

		case actions.FETCHING_TRAITS:
			return fetchingTraitsReducer(state, action);

		case actions.FETCHING_SPECIALIZATIONS:
			return fetchingSpecializationsReducer(state, action);

		case actions.FETCH_ITEMS_RESULT:
			return fetchItemsResultReducer(state, action);

		case actions.FETCH_SKINS_RESULT:
			return fetchSkinsResultReducer(state, action);

		case actions.FETCH_TRAITS_RESULT:
			return fetchTraitsResultReducer(state, action);

		case actions.FETCH_SPECIALIZATIONS_RESULT:
			return fetchSpecializationsResultReducer(state, action);

		case actions.SHOW_TOOLTIP:
			return showTooltipReducer(state, action);

		default:
			return state;
	}
}
'use strict';

import axios from 'axios';

import gw2Api from '../../services/gw2';
import config from '../../app.env';

export const actions = {
	FETCHING_ITEMS: 'FETCHING_ITEMS',
	FETCHING_SKINS: 'FETCHING_SKINS',
	FETCH_ITEMS_RESULT: 'FETCH_ITEMS_RESULT',
	FETCH_SKINS_RESULT: 'FETCH_SKINS_RESULT',
	SHOW_TOOLTIP: 'SHOW_TOOLTIP',
	FETCHING_TRAITS: 'FETCHING_TRAITS',
	FETCHING_SPECIALIZATIONS: 'FETCHING_SPECIALIZATIONS',
	FETCH_TRAITS_RESULT: 'FETCH_TRAITS_RESULT',
	FETCH_SPECIALIZATIONS_RESULT: 'FETCH_SPECIALIZATIONS_RESULT'
};

// 1. FETCH ALL ITEMS+SKINS FOR CHARACTER THAT ARENT IN STORE
// 2. SAVE TO STORE. PERSIST TO DISK 5EVER. KILL CACHE 1NCE/W? (month?)

export function fetchSkinsSuccessResult (items) {
	return {
		type: actions.FETCH_SKINS_RESULT,
		payload: items
	};
}

export function fetchItemsSuccessResult (items) {
	return {
		type: actions.FETCH_ITEMS_RESULT,
		payload: items
	};
}

export function fetchTraitsResultSuccess (traits) {
	return {
		type: actions.FETCH_TRAITS_RESULT,
		payload: traits
	};
}

export function fetchSpecializationsResultSuccess (specializations) {
	return {
		type: actions.FETCH_SPECIALIZATIONS_RESULT,
		payload: specializations
	};
}

export function fetchingTraits (fetching) {
	return {
		type: actions.FETCHING_TRAITS,
		payload: fetching
	};
}

export function fetchingSpecializations (fetching) {
	return {
		type: actions.FETCHING_SPECIALIZATIONS,
		payload: fetching
	};
}

export function fetchingSkins (fetching) {
	return {
		type: actions.FETCHING_SKINS,
		payload: fetching
	};
}

export function fetchingItems (fetching) {
	return {
		type: actions.FETCHING_ITEMS,
		payload: fetching
	};
};

export function fetchSkinsThunk (skins) {
	return (dispatch) => {
		dispatch(fetchingSkins(true));

		return gw2Api.readSkins(skins)
			.then((response) => {
				dispatch(fetchSkinsSuccessResult(response));
				dispatch(fetchingSkins(false));
			});
	};
}

export function fetchItemsThunk (items) {
	return (dispatch) => {
		dispatch(fetchingItems(true));

		return gw2Api.readItems(items)
			.then((response) => {
				dispatch(fetchItemsSuccessResult(response));
				dispatch(fetchingItems(false));
			});
	};
}

export function fetchTraitsThunk (traits) {
	return (dispatch) => {
		dispatch(fetchingTraits(true));

		return gw2Api.readTraits(traits)
			.then((response) => {
				dispatch(fetchTraitsResultSuccess(response));
				dispatch(fetchingTraits(false));
			});
	};
}

export function fetchSpecializationsThunk (specializations) {
	return (dispatch) => {
		dispatch(fetchingSpecializations(true));

		return gw2Api.readSpecializations(specializations)
			.then((response) => {
				dispatch(fetchSpecializationsResultSuccess(response));
				dispatch(fetchingSpecializations(false));

				let traitsToAdd = [];

				for (let specialization in response) {
					if (!response.hasOwnProperty(specialization)) {
						continue;
					}

					traitsToAdd = traitsToAdd.concat(response[specialization].major_traits, response[specialization].minor_traits);
				}

				dispatch(fetchTraitsThunk(traitsToAdd));
			});
	};
}

// TODO: Change input to object, getting a bit big.
export function showTooltip (show, config = {}) {
	return {
		type: actions.SHOW_TOOLTIP,
		payload: {
			show,
			item: config.item,
			skin: config.skin,
			upgrades: config.upgrades,
			type: config.type,
			upgrade_combo_count: config.upgradeCount
		}
	};
}

export const actionCreators = {
	fetchItemsThunk,
	fetchSkinsThunk,
	fetchTraitsThunk,
	fetchSpecializationsThunk,
	showTooltip
};

export default actionCreators;
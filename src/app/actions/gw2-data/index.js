'use strict';

import axios from 'axios';

import gw2Api from '../../services/gw2';
import config from '../../../generated/app.env';

export const actions = {
	FETCHING_ITEMS: 'FETCHING_ITEMS',
	FETCHING_SKINS: 'FETCHING_SKINS',
	FETCH_ITEMS_RESULT: 'FETCH_ITEMS_RESULT',
	FETCH_SKINS_RESULT: 'FETCH_SKINS_RESULT',
	SHOW_TOOLTIP: 'SHOW_TOOLTIP'
};

// 1. FETCH ALL ITEMS+SKINS FOR CHARACTER THAT ARENT IN STORE
// 2. SAVE TO STORE. PERSIST TO DISK 5EVER. KILL CACHE 1NCE/W? (month?)

function fetchSkinsSuccessResult (items) {
	return {
		type: actions.FETCH_SKINS_RESULT,
		payload: items
	};
}

function fetchItemsSuccessResult (items) {
	return {
		type: actions.FETCH_ITEMS_RESULT,
		payload: items
	};
}

function fetchingSkins (fetching) {
	return {
		type: actions.FETCHING_SKINS,
		payload: fetching
	};
}

function fetchingItems (fetching) {
	return {
		type: actions.FETCHING_ITEMS,
		payload: fetching
	};
};

function fetchSkinsThunk (skins) {
	return (dispatch) => {
		dispatch(fetchingSkins(true));

		return gw2Api.readSkins(skins)
			.then((response) => {
				dispatch(fetchSkinsSuccessResult(response));
				dispatch(fetchingSkins(false));
			});
	};
}

function fetchItemsThunk (items) {
	return (dispatch) => {
		dispatch(fetchingItems(true));

		return gw2Api.readItems(items)
			.then((response) => {
				dispatch(fetchItemsSuccessResult(response));
				dispatch(fetchingItems(false));
			});
	};
}

// TODO: Change input to object, getting a bit big.
function showTooltip (show, item, skin, upgrades, type, totalUpgrades) {
	return {
		type: actions.SHOW_TOOLTIP,
		payload: {
			show,
			item,
			skin,
			upgrades,
			type,
			upgrade_combo_count: totalUpgrades
		}
	};
}

export const actionCreators = {
	fetchItemsThunk,
	fetchSkinsThunk,
	showTooltip
};
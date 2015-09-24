'use strict';

import axios from 'axios';

import gw2Api from '../../services/gw2';
import config from '../../../generated/app.env';

export const actions = {
	FETCHING_ITEMS: 'FETCHING_ITEMS',
	FETCHING_SKINS: 'FETCHING_SKINS',
	FETCH_ITEMS_RESULT: 'FETCH_ITEMS_RESULT',
	FETCH_SKINS_RESULT: 'FETCH_SKINS_RESULT',
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

export const actionCreators = {
	fetchItemsThunk,
	fetchSkinsThunk
};
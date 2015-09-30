'use strict';

import axios from 'axios';
import config from '../../../generated/app.env';
import gw2Parse from './gw2-parse';

export const readAllItemIds = () => {
	return axios
		.get(`${config.gw2.endpoint}v2/items`, { 
			ignoreAuth: true,
			cache: true 
		})
		.then((data) => {
			return data.data;
		});
};

export const readItems = (ids) => {
	let id_query = ids.join(',');

	return axios
		.get(`${config.gw2.endpoint}v2/items?ids=${id_query}`, {
			ignoreAuth: true,
			cache: true
		})
		.then((response) => {
			let items = gw2Parse.mapItemsToObject(response.data);

			return Promise.resolve(items);
		});
}

export const readSkins = (ids) => {
	let id_query = ids.join(',');

	return axios
		.get(`${config.gw2.endpoint}v2/skins?ids=${id_query}`, {
			ignoreAuth: true,
			cache: true
		})
		.then((response) => {
			let skins = gw2Parse.mapSkinsToObject(response.data);

			return Promise.resolve(skins);
		});
}

export const readGuild = (guid) => {
	let promise = axios
		.get(`${config.gw2.endpoint}v1/guild_details.json?guild_id=${guid}`, { 
			ignoreAuth: true,
			cache: true 
		})
		.then((data) => {
			return data.data;
		});

	return promise;
}

export const readCharacter = (name) => {
    let promise = axios
      .get(`${config.api.endpoint}characters/${name}`)
      .then((response) => {
     		gw2Parse.parseCharacter(response.data);
        return response.data;
      });

    return promise;
};

const BEGINNING_STAT = 37;
export const calculateBaseAttribute = (level) => {
	let stat = BEGINNING_STAT;

	for (let i = 2; i <= level; i += 1) {
		if (i <= 10) {
			stat += 7;
		} else if (i % 2 !== 0) {
			continue;
		} else if (i <= 20) {
			stat += 10;
		} else if (i <= 24) {
			stat += 14;
		} else if (i <= 26) {
			stat += 15;
		} else if (i <= 30) {
			stat += 16;
		} else if (i <= 40) {
			stat += 20;
		} else if (i <= 44) {
			stat += 24;
		} else if (i <= 46) {
			stat += 25;
		} else if (i <= 50) {
			stat += 26;
		} else if (i <= 60) {
			stat += 30;
		} else if (i <= 64) {
			stat += 34;
		} else if (i <= 66) {
			stat += 35;
		} else if (i <= 70) {
			stat += 36;
		} else if (i <= 74) {
			stat += 44;
		} else if (i <= 76) {
			stat += 45;
		} else {
			stat += 46;
		}
	}

	return stat;
}

export const parseRuneBonuses = (bonuses, count) => {
	let splitBonuses = bonuses.splice(0, count);

	let bonus = parseUpgradeBuffs(splitBonuses);

	return bonus;
}

export const parseUpgradeBuffs = (buffs) => {
	let bonus = {};
	let regex = /(\d+)\D?\s(\D+)/;

	buffs.forEach((buff) => {
		let result = regex.exec(buff);
		if (!result) {
			return;
		}

		let amount = result[1];
		let attribute = result[2].replace(' ', '');

		bonus[attribute] = +amount;
	});

	return bonus;
}

export default {
	calculateBaseAttribute,
	readCharacter,
	readGuild,
	readSkins,
	readItems,
	readAllItemIds,
	parseUpgradeBuffs,
	parseRuneBonuses
};
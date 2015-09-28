'use strict';

import axios from 'axios';
import config from '../../../generated/app.env';
import gw2Parse from './gw2-parse';

/** 
 *	Comment this
 */
let Gw2ApiService = {};

Gw2ApiService.readAllItemIds = () => {
	return axios
		.get(`${config.gw2.endpoint}v2/items`, { 
			ignoreAuth: true,
			cache: true 
		})
		.then((data) => {
			return data.data;
		});
};

Gw2ApiService.readItems = (ids) => {
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

Gw2ApiService.readSkins = (ids) => {
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

Gw2ApiService.readGuild = (guid) => {
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

Gw2ApiService.readCharacter = (name) => {
    let promise = axios
      .get(`${config.api.endpoint}characters/${name}`)
      .then((response) => {
     		gw2Parse.parseCharacter(response.data);
        return response.data;
      });

    return promise;
};

export default Gw2ApiService
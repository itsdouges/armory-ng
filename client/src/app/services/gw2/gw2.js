'use strict';

import axios from 'axios';
import config from '../../../generated/app.env';
import gw2Parse from './gw2-parse';

/** 
 *	Comment this
 */
let Gw2ApiService = {};

Gw2ApiService.prototype.readSkin = (id) => {
	return axios
		.get(`${config.gw2.endpoint}v2/skins/${id}`, {
			headers: {
				Authorization: undefined
			},
			cache: true 
		})
		.then((data) => {
			return data.data;
		});
}

Gw2ApiService.prototype.readItem = (id) => {
	return axios
		.get(`${config.gw2.endpoint}v2/items/${id}`, { 
			headers: {
				Authorization: undefined
			},
			cache: true 
		})
		.then((data) => {
			gw2Parse.parseItem(data.data);
			return data.data;
		});
}

Gw2ApiService.prototype.readItems = (ids) => {
	let id_query = ids.join(',');

	return axios
		.get(`${config.gw2.endpoint}v2/items?ids=${id_query}`, { 
			headers: {
				Authorization: undefined
			},
			cache: true 
		})
		.then((data) => {
			data.data.forEach(function(item) {
				item = gw2Parse.parseItem(item);
			});

			return data.data;
		});
}

Gw2ApiService.prototype.readGuild = (guid) => {
	let promise = axios
		.get(`${config.gw2.endpoint}v1/guild_details.json?guild_id=${guid}`, { 
			headers: {
				Authorization: undefined
			},
			cache: true 
		})
		.then((data) => {
			return data.data;
		});

	return promise;
}

Gw2ApiService.prototype.readCharacter = (name) => {
    let promise = axios
      .get(`${config.api.endpoint}characters/${name}`)
      .then((response) => {
     		gw2Parse.parseCharacter(response.data);
        return response.data;
      });

    return promise;
};

export default Gw2ApiService
'use strict';

/** 
 *	Comment this
 */
function Gw2ApiService ($http, env, $q, gw2ParseService) {
	this.checkToken = (token) => {
		var promise = $http
			.get(`${env.gw2.endpoint}v2/tokeninfo`, {
				headers: {
					Authorization: token
				}
			})
			.then((success) => {
				let valid = success.data.permissions.filter((x) => {
					return x === 'characters' || x === 'account';
				});

				if (valid.length != 2) {
					return $q.reject();
				}
			});

		return promise;
	};

	this.readSkin = (id) => {
		let promise = $http
			.get(`${env.gw2.endpoint}v2/skins/${id}`, { 
				cache: true 
			})
			.then((data) => {
				let item = data.data;
				return item;
			});

		return promise;
	}

	this.readItem = (id) => {
		let promise = $http
			.get(`${env.gw2.endpoint}v2/items/${id}`, { 
				cache: true 
			})
			.then((data) => {
				let item = gw2ParseService.parseItem(data.data);
				return item;
			});

		return promise;
	}

	this.readItems = (ids) => {
		let id_query = ids.join(',');

		let promise = $http
			.get(`${env.gw2.endpoint}v2/items?ids=${id_query}`, { 
				cache: true 
			})
			.then((data) => {
				let items = data.data;
				items.forEach(function(item) {
					item = gw2ParseService.parseItem(item);
				});

				return items;
			});

		return promise;
	}

	this.readGuild = (guid) => {
		let promise = $http
			.get(`${env.gw2.endpoint}v1/guild_details.json?guild_id=${guid}`, { 
				cache: true 
			})
			.then((data) => {
				return data.data;
			});

		return promise;
	}
}

export default Gw2ApiService
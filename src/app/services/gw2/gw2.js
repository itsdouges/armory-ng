'use strict';

/** 
 *	Comment this
 */
function Gw2ApiService ($http, env, $q, gw2ParseService) {
	Gw2ApiService.prototype.checkToken = (token) => {
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

	Gw2ApiService.prototype.readSkin = (id) => {
		let promise = $http
			.get(`${env.gw2.endpoint}v2/skins/${id}`, { 
				cache: true 
			})
			.then((data) => {
				return data.data;
			});

		return promise;
	}

	Gw2ApiService.prototype.readItem = (id) => {
		let promise = $http
			.get(`${env.gw2.endpoint}v2/items/${id}`, { 
				cache: true 
			})
			.then((data) => {
				gw2ParseService.parseItem(data.data);
				return data.data;
			});

		return promise;
	}

	Gw2ApiService.prototype.readItems = (ids) => {
		let id_query = ids.join(',');

		let promise = $http
			.get(`${env.gw2.endpoint}v2/items?ids=${id_query}`, { 
				cache: true 
			})
			.then((data) => {
				data.data.forEach(function(item) {
					item = gw2ParseService.parseItem(item);
				});

				return data.data;
			});

		return promise;
	}

	Gw2ApiService.prototype.readGuild = (guid) => {
		let promise = $http
			.get(`${env.gw2.endpoint}v1/guild_details.json?guild_id=${guid}`, { 
				cache: true 
			})
			.then((data) => {
				return data.data;
			});

		return promise;
	}

	Gw2ApiService.prototype.readCharacter = (name) => {
	    let promise = $http
	      .get(`${env.api.endpoint}characters/${name}`)
	      .then((response) => {
	     	gw2ParseService.parseCharacter(response.data);

	        return response.data;
	      });

	    return promise;
	};
}

export default Gw2ApiService
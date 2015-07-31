let _http;
let domain = 'https://api.guildwars2.com/v1/';

class Gw2ApiService {
	constructor($http) {
		_http = $http;
	}

	readItem(id) {
		let promise = _http.get(`${domain}item_details.json?item_id=${id}`);
		
		let scope = this;

		let promiseOverride = promise.then(function(data) {
			let item = data.data;
			item.iconUrl = scope.buildRenderUrl(item.icon_file_id, item.icon_file_signature);
			item.gold = Math.floor(item.vendor_value / 1000);
			item.silver = Math.floor(item.vendor_value / 100);
			item.copper = item.vendor_value % 100;

			return item;
		}, function(data) {
			return data;
		});

		return promiseOverride;
	}

	readGuild(guid) {
		let promise = _http.get(`${domain}guild_details.json?guild_id=${guid}`);
		let scope = this;

		let promiseOverride = promise.then(function(data) {
			let item = data.data;
			return item;
		}, function(data) {
			return data;
		});

		return promiseOverride;
	}

	buildRenderUrl(id, signature) {
		return `https://render.guildwars2.com/file/${signature}/${id}.png`;
	}
}

export default Gw2ApiService
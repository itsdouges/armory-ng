let _http;

class Gw2ApiService {
	constructor($http) {
		_http = $http;
	}

	readItem(id) {
		let promise = _http.get('https://api.guildwars2.com/v1/item_details.json?item_id=' + id);
		
		let scope = this;

		let promiseOverride = promise.then(function(data) {
			let item = data.data;
			item.iconUrl = scope.buildRenderUrl(item.icon_file_id, item.icon_file_signature);

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
let _http;

class Gw2ApiService {
	constructor($http) {
		_http = $http;
	}

	readItem(id) {
		let promise = _http.get('https://api.guildwars2.com/v1/item_details.json?item_id=' + id);
		
		let promiseOverride = promise.then(function(data) {
			return data.data;
		}, function(data) {
			// TODO: Add retry logic.
		});

		return promiseOverride;
	}

	buildRenderUrl(id, signature) {
		return `https://render.guildwars2.com/file/${signature}/${id}.png`;
	}
}

export default Gw2ApiService
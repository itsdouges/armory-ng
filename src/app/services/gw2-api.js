let _http;
let domain = 'https://api.guildwars2.com/';

// TODO: Clean this js up. Terrible!
// TODO: TEST THIS FILE OMG!

function parseGw2Markup(text) {
	return text;

	if (!text) {
		return;
	}

	let classRegEx = /@\w+/;
	let className = classRegEx.exec(text);

	if (className) {
		className = className[0];
	}

	if (className && className.indexOf('@')) {
		className = className.substr(1);
	}

	let tagsRegEx = /<c[^>]*>|<.c>/;
	let tags = tagsRegEx.exec(text);

	let description = text.replace(tags, '');

	return description;
}

function splitBonusDescription(text) {
	return text.split('\n');
}

function canTransmute(type) {

}

function hasTwoSlots(type) {
	switch(type) {
		case 'Greatsword':
		case 'Hammer':
		case 'Longbow':
		case 'Rifle':
		case 'ShortBow':
		case 'Staff':
		case 'HarpoonGun':
		case 'Trident':
		case 'Spear':
			return true;
	}

	return false;
}

function hasInitialUpgradeSlot(type) {
	switch(type) {
		case 'Weapon': 
		case 'Armor':
		case 'Trinket':
		case 'Accessory':
		case 'Amulet':
		case 'Back':
			return true;
	}

	return false;
}

class Gw2ApiService {
	constructor($http, $q) {
		_http = $http;
		this.$q = $q;
	}

	checkToken () {
		var defer = this.$q.defer();

		setTimeout(function () {
			defer.resolve(true);
		}, 1000);

		return defer.promise;
	};

	readSkin(id) {
		let promise = _http.get(`${domain}v2/skins/${id}`, { cache: true });
		let scope = this;

		let promiseOverride = promise.then(function(data) {
			let item = data.data;
			return item;
		}, function(data) {
			return data;
		});

		return promiseOverride;
	}

	readItem(id) {
		let promise = _http.get(`${domain}v2/items/${id}`, { cache: true });
		
		let scope = this;

		let promiseOverride = promise.then(function(data) {
			let item = data.data;
			item.gold = Math.floor(item.vendor_value / 1000);
			item.silver = Math.floor(item.vendor_value / 100);
			item.copper = item.vendor_value % 100;

			item.flags.forEach(function(flag) {
				// TODO: Will have to modify this if I open up inventory..
				if (flag === 'SoulBindOnUse' || flag === 'SoulbindOnAcquire') {
					item.boundStatus = 'Souldbound';
				} else if (flag === 'AccountBoundOnUse' || flag === 'AccountBound') {
					item.boundStatus = 'Account Bound';
				}
			});

			item.description = parseGw2Markup(item.description);

			// test..
			if (item.details.bonuses) {
				item.details.bonuses = splitBonusDescription(item.details.bonuses);
			}

			item.has_slot_one = hasInitialUpgradeSlot(item.details.type);

			if (item.type === 'Weapon') {
				item.has_slot_two = hasTwoSlots(item.details.type);
			}

			return item;
		}, function(data) {
			return data;
		});

		return promiseOverride;
	}

	readItems(ids) {
		let id_query = '';

		if (!Array.isArray(ids)) {
			throw new Error('Pass in an array of ids');
		}

		ids.forEach(function(id) {
			id_query += `${id},`;
		});

		let promise = _http.get(`${domain}v2/items?ids=${id_query}`, { cache: true });
		
		let scope = this;

		let promiseOverride = promise.then(function(data) {
			let items = data.data;

			items.forEach(function(item) {
				item.gold = Math.floor(item.vendor_value / 1000);
				item.silver = Math.floor(item.vendor_value / 100);
				item.copper = item.vendor_value % 100;

				item.flags.forEach(function(flag) {
					// TODO: Will have to modify this if I open up inventory..
					if (flag === 'SoulBindOnUse' || flag === 'SoulbindOnAcquire') {
						item.boundStatus = 'Souldbound';
					} else if (flag === 'AccountBoundOnUse' || flag === 'AccountBound') {
						item.boundStatus = 'Account Bound';
					}
				});

				// test..
				if (item.details.infix_upgrade && item.details.infix_upgrade.buff && item.details.infix_upgrade.buff.description) {
					item.details.infix_upgrade.buff.description = splitBonusDescription(item.details.infix_upgrade.buff.description);
				}

				item.description = parseGw2Markup(item.description);

				item.has_slot_one = hasInitialUpgradeSlot(item.type);

				if (item.type === 'Weapon') {
					item.has_slot_two = hasTwoSlots(item.details.type);
				}
			});

			return items;
		}, function(data) {
			return data;
		});

		return promiseOverride;
	}

	readGuild(guid) {
		let promise = _http.get(`${domain}v1/guild_details.json?guild_id=${guid}`, { cache: true });
		let scope = this;

		let promiseOverride = promise.then(function(data) {
			let item = data.data;
			return item;
		}, function(data) {
			return data;
		});

		return promiseOverride;
	}

	buildRenderUri(id, signature) {
		return `https://render.guildwars2.com/file/${signature}/${id}.png`;
	}
}

export default Gw2ApiService
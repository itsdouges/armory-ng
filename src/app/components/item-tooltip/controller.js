function ItemTooltipController(gw2ApiService, $q) {
	let vm = this;
	let _loaded;
	let _busy;

	function init() {
		let itemIdPassedIn = !!vm.item && !!vm.item.id;
		let isEquipped = !!vm.slotName && !!itemIdPassedIn;

		vm.typeName = isEquipped ? 'Currently Equipped' : vm.slotName;

		if (itemIdPassedIn) {
			loadTooltip(vm.item.id, vm.item.skin, vm.item.upgrades);
		}
	}

	// todo: extract to gw2api?
	function readSuccess(items) {
		let arrayOfItems = items[0];
		let skin = items[1];
		let upgrade1;
		let upgrade2;

		let item = arrayOfItems.filter(function(item) {
			return item.id === vm.item.id;
		})[0];

		if (!item) {
			throw new Error('Item shouldn\'t be undefined.');
		}

		if (skin) {
			item.icon = skin.icon;

			let regex = /[\w'\-]+/;
			let prefix = regex.exec(item.name);
			item.original_name = item.name;
			item.name = `${prefix} ${skin.name}`;
		}

		if (vm.item.upgrades) {
			upgrade1 = arrayOfItems.filter(function(item) {
				return item.id === vm.item.upgrades[0];
			})[0];

			// todo: unit test this
			upgrade1.total_count = vm.item.upgrade_count.count;

			upgrade2 = arrayOfItems.filter(function(item) {
				return item.id === vm.item.upgrades[1];
			})[0] || undefined;

			item.name += ` ${upgrade1.details.suffix}`;

			item.details.upgrade_one = upgrade1;
			item.details.upgrade_two = upgrade2;
		}

		// todo:
		// infuse subobject ??
		// armor  infuse slot = flags  -> "Defense"
		// weapon infuse slot = flags  -> "Offense"

		vm.model = item;

		_busy = false;
		_loaded = true;
	};

	function readFailure() {
		_busy = false;
	};

	function loadTooltip(itemId, skinId, upgrades) {
		_busy = true;
		_loaded = false;

		let skinPromise;
		let itemIds = [itemId];

		if (skinId) {
			skinPromise = gw2ApiService.readSkin(skinId);
		}

		if (upgrades) {
			upgrades.forEach(function (id) {
				itemIds.push(id);
			});
		}

		let promises = [
			gw2ApiService.readItems(itemIds),
			skinPromise
		];

		$q.all(promises)
			.then(readSuccess, readFailure);
	}

	function isLoaded() {
		return _loaded;
	}

	function isBusy() {
		return _busy;
	}

	function getUpgradeCount(id) {

	}

	init();

	vm.isLoaded = isLoaded;
	vm.isBusy = isBusy;
}

export default ItemTooltipController;
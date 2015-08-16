
// TODO: Clean this js up. Terrible!
// TODO: TEST THIS FILE OMG!

function Gw2ParseService() {

}

Gw2ParseService.prototype.parseItem = (inItem) => {
	let parseVendorValue = (item) => {
		item.vendor_value = item.vendor_value || 0;
		item.gold = Math.floor(item.vendor_value / 1000);
		item.silver = Math.floor(item.vendor_value / 100);
		item.copper = item.vendor_value % 100;
	};

	let parseFlags = (item) => {
		if (!item.flags) {
			return;
		}

		item.flags.forEach((flag) => {
			switch(flag){
				case 'SoulBindOnUse':
				case 'SoulbindOnAcquire':
					item.boundStatus = 'Soulbound';
					return;

				case 'AccountBoundOnUse':
				case 'AccountBound':
					item.boundStatus = 'Accountbound';
					return;
			}
		});
	};

	let parseInfixDescription = (item) => {
		if (item.details && item.details.infix_upgrade && item.details.infix_upgrade.buff && item.details.infix_upgrade.buff.description) {
			item.details.infix_upgrade.buff.description = item.details.infix_upgrade.buff.description.split('\n');
		}
	};

	let parseAvailableWeaponSlots = (item) => {
		let hasSlotOne = false;
		let hasSlotTwo = false;

		switch(item.type) {
			case 'Weapon': 
			case 'Armor':
			case 'Trinket':
			case 'Accessory':
			case 'Amulet':
			case 'Back':
				item.has_slot_one = true;
		}

		if (item.type !== 'Weapon' || !item.details) {
			return; 
		}

		switch(item.details.type) {
			case 'Greatsword':
			case 'Hammer':
			case 'Longbow':
			case 'Rifle':
			case 'ShortBow':
			case 'Staff':
			case 'HarpoonGun':
			case 'Trident':
			case 'Spear':
				item.has_slot_two = true;
		}
	};

	let parseDescription = (item) => {
		// TODO: Implement :-).
	};

	parseVendorValue(inItem);
	parseFlags(inItem);
	parseInfixDescription(inItem);
	parseAvailableWeaponSlots(inItem);
	parseDescription(inItem);
};

export default Gw2ParseService;
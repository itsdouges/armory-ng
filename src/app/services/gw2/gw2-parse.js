
// TODO: Clean this js up. Terrible!
// TODO: TEST THIS FILE OMG!

	this.buildRenderUri = (id, signature) => {
		return `https://render.guildwars2.com/file/${signature}/${id}.png`;
	}

function parseItem(item) {
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
}


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
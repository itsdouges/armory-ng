let parseCharacter = (hey) => {
	let inCharacter = {
		...hey
	};
      let parseCharacterUpgrades = (character) => {
        let characterUpgrades = {};

        if (!character.equipment) {
          return;
        }

        character.equipment.forEach(function(equip) {
          if (equip.upgrades) {
            let upgrade_id;

            equip.upgrades.forEach(function(upgrade) {
              upgrade_id = upgrade;

              if (!characterUpgrades[upgrade_id]) {
                characterUpgrades[upgrade_id] = {
                  total: 1
                };
              } else {
                characterUpgrades[upgrade_id].total += 1;
              }
            });

            equip.counts = characterUpgrades[upgrade_id];
          }
        });
      };

      let parseEquipment = (character) => {
      	if (!character.equipment) {
      		character.equipment = [];
      	}

		character.equipment = {
			helmAquatic: character.equipment.filter((x) => {
				return x.slot === 'HelmAquatic';
			})[0],
			backpack: character.equipment.filter((x) => {
				return x.slot === 'Backpack';
			})[0],
			coat: character.equipment.filter((x) => {
				return x.slot === 'Coat';
			})[0],
			boots: character.equipment.filter((x) => {
				return x.slot === 'Boots';
			})[0],
			gloves: character.equipment.filter((x) => {
				return x.slot === 'Gloves';
			})[0],
			helm: character.equipment.filter((x) => {
				return x.slot === 'Helm';
			})[0],
			leggings: character.equipment.filter((x) => {
				return x.slot === 'Leggings';
			})[0],
			shoulders: character.equipment.filter((x) => {
				return x.slot === 'Shoulders';
			})[0],
			accessory1: character.equipment.filter((x) => {
				return x.slot === 'Accessory1';
			})[0],
			accessory2: character.equipment.filter((x) => {
				return x.slot === 'Accessory2';
			})[0],
			ring1: character.equipment.filter((x) => {
				return x.slot === 'Ring1';
			})[0],
			ring2: character.equipment.filter((x) => {
				return x.slot === 'Ring2';
			})[0],
			amulet: character.equipment.filter((x) => {
				return x.slot === 'Amulet';
			})[0],
			weaponAquaticA: character.equipment.filter((x) => {
				return x.slot === 'WeaponAquaticA';
			})[0],
			weaponAquaticB: character.equipment.filter((x) => {
				return x.slot === 'WeaponAquaticB';
			})[0],
			weaponA1: character.equipment.filter((x) => {
				return x.slot === 'WeaponA1';
			})[0],
			weaponA2: character.equipment.filter((x) => {
				return x.slot === 'WeaponA2';
			})[0],
			weaponB1: character.equipment.filter((x) => {
				return x.slot === 'WeaponB1';
			})[0],
			weaponB2: character.equipment.filter((x) => {
				return x.slot === 'WeaponB2';
			})[0],
			sickle: character.equipment.filter((x) => {
				return x.slot === 'Sickle';
			})[0],
			pick: character.equipment.filter((x) => {
				return x.slot === 'Pick';
			})[0],
			axe: character.equipment.filter((x) => {
				return x.slot === 'Axe';
			})[0]
		};
      };

    let parseWeaponSwap = (character) => {
    	switch(character.profession) {
    		case 'Warrior':
    		case 'Guardian':
    		// TODO: Get the other cases.
    			character.hasWeaponSwap = true;
    			return;
			default:
				character.hasWeaponSwap = false;
				return;
    	}
    };

    parseCharacterUpgrades(inCharacter);
    parseEquipment(inCharacter);
    parseWeaponSwap(inCharacter);

    return inCharacter;
};

let parseItem = (x) => {
	let inItem = {
		...x
	};

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

	return inItem;
};

let mapItemsToObject = (items) => {
	let object = {};

	items.forEach((item) => {
		let parsedItem = parseItem(item);

		object[parsedItem.id] = parsedItem;
	});

	return object;
};

let mapSkinsToObject = (items) => {
	let object = {};

	items.forEach((item) => {
		object[item.id] = item;
	});

	return object;
};

let Gw2ParseService = {
	parseCharacter,
	parseItem,
	mapItemsToObject,
	mapSkinsToObject
};

export default Gw2ParseService;
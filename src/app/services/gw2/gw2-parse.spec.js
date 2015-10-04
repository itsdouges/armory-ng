import gw2Parse from './gw2-parse';

describe('gw2 parse service', function () {
	it ('should not die if values arent available', function () {
		const item = {};

		gw2Parse.parseItem(item);
	});

	it ('should parse vendor_value into gold silver copper', function () {
		const item = {
			vendor_value: 1243
		};

		let actual = gw2Parse.parseItem(item);

		expect(actual.gold).toBe(1);
		expect(actual.silver).toBe(12);
		expect(actual.copper).toBe(43);
	});

	it ('should parse vendor_value into 0 gold 0 silver 0 copper', function () {
		const item = {};

		let actual = gw2Parse.parseItem(item);

		expect(actual.gold).toBe(0);
		expect(actual.silver).toBe(0);
		expect(actual.copper).toBe(0);
	});

	it ('should parse account bound flag SoulBindOnUse', function () {
		const item = {
			flags: [
				'SoulBindOnUse'
			]
		};

		let actual = gw2Parse.parseItem(item);

		expect(actual.boundStatus).toBe('Soulbound');
	});

	it ('should parse account bound flag SoulbindOnAcquire', function () {
		const item = {
			flags: [
				'SoulbindOnAcquire'
			]
		};

		let actual = gw2Parse.parseItem(item);

		expect(actual.boundStatus).toBe('Soulbound');
	});

	it ('should parse account bound flag AccountBoundOnUse', function () {
		const item = {
			flags: [
				'AccountBoundOnUse'
			]
		};

		let actual = gw2Parse.parseItem(item);

		expect(actual.boundStatus).toBe('Accountbound');
	});

	it ('should parse account bound flag AccountBound', function () {
		const item = {
			flags: [
				'AccountBoundOnUse'
			]
		};

		let actual = gw2Parse.parseItem(item);

		expect(actual.boundStatus).toBe('Accountbound');
	});

	it ('should parse infix description', function () {
		const item = {
			details: {
				infix_upgrade: {
					buff: {
						description: '+6\n+5\n+4'
					}
				}
			}
		};

		let actual = gw2Parse.parseItem(item);

		expect(actual.details.infix_upgrade.buff.description).toEqual(['+6', '+5', '+4']);
	});

	it ('should parse valid types to have available slot one', function () {
		const validTypes = [
			'Weapon',
			'Armor',
			'Trinket',
			'Accessory',
			'Amulet',
			'Back'
		];

		validTypes.forEach(function (type) {
			const item = {
				type: type
			};

			let actual = gw2Parse.parseItem(item);

			expect(actual.has_slot_one).toBe(true);
		});
	});

	it ('should parse valid weapon types to have available slot two', function () {
		const validTypes = [
			'Greatsword',
			'Hammer',
			'Longbow',
			'Rifle',
			'ShortBow',
			'Staff',
			'HarpoonGun',
			'Trident',
			'Spear'
		];

		validTypes.forEach(function (type) {
			const item = {
				type: 'Weapon',
				details: {
					type: type
				}
			};

			let actual = gw2Parse.parseItem(item);

			expect(actual.has_slot_one).toBe(true);
			expect(actual.has_slot_two).toBe(true);
		});
	});

  it ('should parse and count character upgrades', function () {
    const responseData = {
        equipment: [
		    {
		      "id": 63276,
		      "slot": "Backpack",
		      "upgrades": [
		        24544
		      ]
		    },
		    {
		      "id": 11188,
		      "slot": "Helm",
		      "upgrades": [
		        24800
		      ]
		    },
		    {
		      "id": 11146,
		      "slot": "Leggings",
		      "upgrades": [
		        24800
		      ]
		    },
		    {
		      "id": 11349,
		      "slot": "Shoulders",
		      "upgrades": [
		        24800
		      ],
		      "skin": 5793
		    },
		    {
		      "id": 13453,
		      "slot": "Accessory1",
		      "upgrades": [
		        24921
		      ]
		    },
		    {
		      "id": 13418,
		      "slot": "Ring1",
		      "upgrades": [
		        24544
		      ]
		    },
		    {
		      "id": 13418,
		      "slot": "Ring2",
		      "upgrades": [
		        24544
		      ]
		    },
		    {
		      "id": 18571,
		      "slot": "WeaponA1",
		      "upgrades": [
		        24681
		      ]
		    }
  		]    
		};

  	let actual = gw2Parse.parseCharacter(responseData);

  	expect(actual.equipment.weaponA1.counts.total).toBe(1);
  	expect(actual.equipment.ring2.counts.total).toBe(3);

		expect(actual.equipment.shoulders.counts.total).toBe(3);
   	expect(actual.equipment.helm.counts.total).toBe(3);
   	expect(actual.equipment.leggings.counts.total).toBe(3);
  });

  it ('should copy character equipment array items to properties', function () {
    const responseData = {
      equipment: [
        {
          "id": 1,
          "slot": "HelmAquatic"
        },
        {
          "id": 2,
          "slot": "Backpack"
        },
        {
          "id": 3,
          "slot": "Coat"
        },
        {
          "id": 4,
          "slot": "Boots"
        },
        {
          "id": 5,
          "slot": "Gloves"
        },
        {
          "id": 6,
          "slot": "Helm"
        },
        {
          "id": 7,
          "slot": "Leggings"
        },
        {
          "id": 8,
          "slot": "Shoulders"
        },
        {
          "id": 9,
          "slot": "Accessory1"
        },
        {
          "id": 10,
          "slot": "Accessory2"
        },
        {
          "id": 11,
          "slot": "Ring1"
        },
        {
          "id": 12,
          "slot": "Ring2"
        },
        {
          "id": 13,
          "slot": "Amulet"
        },
        {
          "id": 14,
          "slot": "WeaponAquaticA"
        },
        {
          "id": 15,
          "slot": "WeaponAquaticB"
        },
        {
          "id": 16,
          "slot": "WeaponA1"
        },
        {
          "id": 17,
          "slot": "WeaponA2"
        },
        {
          "id": 18,
          "slot": "WeaponB1"
        },
        {
          "id": 19,
          "slot": "WeaponB2"
        },
        {
          "id": 20,
          "slot": "Sickle"
        },
        {
          "id": 21,
          "slot": "Pick"
        },
        {
          "id": 22,
          "slot": "Axe"
        }
      ]
    };

    let actual = gw2Parse.parseCharacter(responseData);

    expect(actual.equipment.helmAquatic).toEqual({
      id: 1,
      slot: 'HelmAquatic'
    });

    expect(actual.equipment.backpack).toEqual({
      id: 2,
      slot: 'Backpack'
    });

    expect(actual.equipment.coat).toEqual({
      id: 3,
      slot: 'Coat'
    });

    expect(actual.equipment.boots).toEqual({
      id: 4,
      slot: 'Boots'
    });

    expect(actual.equipment.gloves).toEqual({
      id: 5,
      slot: 'Gloves'
    });

    expect(actual.equipment.helm).toEqual({
      id: 6,
      slot: 'Helm'
    });

    expect(actual.equipment.leggings).toEqual({
      id: 7,
      slot: 'Leggings'
    });

    expect(actual.equipment.shoulders).toEqual({
      id: 8,
      slot: 'Shoulders'
    });

    expect(actual.equipment.accessory1).toEqual({
      id: 9,
      slot: 'Accessory1'
    });

    expect(actual.equipment.accessory2).toEqual({
      id: 10,
      slot: 'Accessory2'
    });

    expect(actual.equipment.ring1).toEqual({
      id: 11,
      slot: 'Ring1'
    });

    expect(actual.equipment.ring2).toEqual({
      id: 12,
      slot: 'Ring2'
    });

    expect(actual.equipment.amulet).toEqual({
      id: 13,
      slot: 'Amulet'
    });

    expect(actual.equipment.weaponAquaticA).toEqual({
      id: 14,
      slot: 'WeaponAquaticA'
    });

    expect(actual.equipment.weaponAquaticB).toEqual({
      id: 15,
      slot: 'WeaponAquaticB'
    });

    expect(actual.equipment.weaponA1).toEqual({
      id: 16,
      slot: 'WeaponA1'
    });

    expect(actual.equipment.weaponA2).toEqual({
      id: 17,
      slot: 'WeaponA2'
    });

    expect(actual.equipment.weaponB1).toEqual({
      id: 18,
      slot: 'WeaponB1'
    });

    expect(actual.equipment.weaponB2).toEqual({
      id: 19,
      slot: 'WeaponB2'
    });

    expect(actual.equipment.sickle).toEqual({
      id: 20,
      slot: 'Sickle'
    });

    expect(actual.equipment.pick).toEqual({
      id: 21,
      slot: 'Pick'
    });

    expect(actual.equipment.axe).toEqual({
      id: 22,
      slot: 'Axe'
    });
  });

	it ('should set hasWeaponSwap if the character class supports it', function () {
		const responseData = {
			profession: 'Warrior'
		};

		let actual = gw2Parse.parseCharacter(responseData);

		// TODO: Finish !

		expect(actual.hasWeaponSwap).toBe(true);
	});
});
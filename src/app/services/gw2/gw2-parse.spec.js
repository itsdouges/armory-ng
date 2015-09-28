// describe('gw2 parse service', function () {
// 	var systemUnderTest;

// 	beforeEach(module('gw2armory'));

// 	beforeEach(function() {
// 		inject(function(gw2ParseService) {
// 			systemUnderTest = gw2ParseService;
// 		});
// 	});

// 	it ('should not die if values arent available', function () {
// 		var item = {};

// 		systemUnderTest.parseItem(item);
// 	});

// 	it ('should parse vendor_value into gold silver copper', function () {
// 		var item = {
// 			vendor_value: 1243
// 		};

// 		systemUnderTest.parseItem(item);

// 		expect(item.gold).toBe(1);
// 		expect(item.silver).toBe(12);
// 		expect(item.copper).toBe(43);
// 	});

// 	it ('should parse vendor_value into 0 gold 0 silver 0 copper', function () {
// 		var item = {};

// 		systemUnderTest.parseItem(item);

// 		expect(item.gold).toBe(0);
// 		expect(item.silver).toBe(0);
// 		expect(item.copper).toBe(0);
// 	});

// 	it ('should parse account bound flag SoulBindOnUse', function () {
// 		var item = {
// 			flags: [
// 				'SoulBindOnUse'
// 			]
// 		};

// 		systemUnderTest.parseItem(item);

// 		expect(item.boundStatus).toBe('Soulbound');
// 	});

// 	it ('should parse account bound flag SoulbindOnAcquire', function () {
// 		var item = {
// 			flags: [
// 				'SoulbindOnAcquire'
// 			]
// 		};

// 		systemUnderTest.parseItem(item);

// 		expect(item.boundStatus).toBe('Soulbound');
// 	});

// 	it ('should parse account bound flag AccountBoundOnUse', function () {
// 		var item = {
// 			flags: [
// 				'AccountBoundOnUse'
// 			]
// 		};

// 		systemUnderTest.parseItem(item);

// 		expect(item.boundStatus).toBe('Accountbound');
// 	});

// 	it ('should parse account bound flag AccountBound', function () {
// 		var item = {
// 			flags: [
// 				'AccountBoundOnUse'
// 			]
// 		};

// 		systemUnderTest.parseItem(item);

// 		expect(item.boundStatus).toBe('Accountbound');
// 	});

// 	it ('should parse infix description', function () {
// 		var item = {
// 			details: {
// 				infix_upgrade: {
// 					buff: {
// 						description: '+6\n+5\n+4'
// 					}
// 				}
// 			}
// 		};

// 		systemUnderTest.parseItem(item);

// 		expect(item.details.infix_upgrade.buff.description).toEqual(['+6', '+5', '+4']);
// 	});

// 	it ('should parse valid types to have available slot one', function () {
// 		var validTypes = [
// 			'Weapon',
// 			'Armor',
// 			'Trinket',
// 			'Accessory',
// 			'Amulet',
// 			'Back'
// 		];

// 		validTypes.forEach(function (type) {
// 			var item = {
// 				type: type
// 			};

// 			systemUnderTest.parseItem(item);

// 			expect(item.has_slot_one).toBe(true);
// 		});
// 	});

// 	it ('should parse valid weapon types to have available slot two', function () {
// 		var validTypes = [
// 			'Greatsword',
// 			'Hammer',
// 			'Longbow',
// 			'Rifle',
// 			'ShortBow',
// 			'Staff',
// 			'HarpoonGun',
// 			'Trident',
// 			'Spear'
// 		];

// 		validTypes.forEach(function (type) {
// 			var item = {
// 				type: 'Weapon',
// 				details: {
// 					type: type
// 				}
// 			};

// 			systemUnderTest.parseItem(item);

// 			expect(item.has_slot_one).toBe(true);
// 			expect(item.has_slot_two).toBe(true);
// 		});
// 	});

//   it ('should parse and count character upgrades', function () {
//     var responseData = {
//         equipment: [
// 		    {
// 		      "id": 63276,
// 		      "slot": "Backpack",
// 		      "upgrades": [
// 		        24544
// 		      ]
// 		    },
// 		    {
// 		      "id": 11188,
// 		      "slot": "Helm",
// 		      "upgrades": [
// 		        24800
// 		      ]
// 		    },
// 		    {
// 		      "id": 11146,
// 		      "slot": "Leggings",
// 		      "upgrades": [
// 		        24800
// 		      ]
// 		    },
// 		    {
// 		      "id": 11349,
// 		      "slot": "Shoulders",
// 		      "upgrades": [
// 		        24800
// 		      ],
// 		      "skin": 5793
// 		    },
// 		    {
// 		      "id": 13453,
// 		      "slot": "Accessory1",
// 		      "upgrades": [
// 		        24921
// 		      ]
// 		    },
// 		    {
// 		      "id": 13418,
// 		      "slot": "Ring1",
// 		      "upgrades": [
// 		        24544
// 		      ]
// 		    },
// 		    {
// 		      "id": 13418,
// 		      "slot": "Ring2",
// 		      "upgrades": [
// 		        24544
// 		      ]
// 		    },
// 		    {
// 		      "id": 18571,
// 		      "slot": "WeaponA1",
// 		      "upgrades": [
// 		        24681
// 		      ]
// 		    }
//   		]    
// 	};    

//     systemUnderTest.parseCharacter(responseData);

//     expect(responseData.equipment.weaponA1.counts.total).toBe(1);
//     expect(responseData.equipment.ring2.counts.total).toBe(3);

// 	expect(responseData.equipment.shoulders.counts.total).toBe(3);
//    	expect(responseData.equipment.helm.counts.total).toBe(3);
//    	expect(responseData.equipment.leggings.counts.total).toBe(3);
//   });

//   it ('should copy character equipment array items to properties', function () {
//     var responseData = {
//       equipment: [
//         {
//           "id": 1,
//           "slot": "HelmAquatic"
//         },
//         {
//           "id": 2,
//           "slot": "Backpack"
//         },
//         {
//           "id": 3,
//           "slot": "Coat"
//         },
//         {
//           "id": 4,
//           "slot": "Boots"
//         },
//         {
//           "id": 5,
//           "slot": "Gloves"
//         },
//         {
//           "id": 6,
//           "slot": "Helm"
//         },
//         {
//           "id": 7,
//           "slot": "Leggings"
//         },
//         {
//           "id": 8,
//           "slot": "Shoulders"
//         },
//         {
//           "id": 9,
//           "slot": "Accessory1"
//         },
//         {
//           "id": 10,
//           "slot": "Accessory2"
//         },
//         {
//           "id": 11,
//           "slot": "Ring1"
//         },
//         {
//           "id": 12,
//           "slot": "Ring2"
//         },
//         {
//           "id": 13,
//           "slot": "Amulet"
//         },
//         {
//           "id": 14,
//           "slot": "WeaponAquaticA"
//         },
//         {
//           "id": 15,
//           "slot": "WeaponAquaticB"
//         },
//         {
//           "id": 16,
//           "slot": "WeaponA1"
//         },
//         {
//           "id": 17,
//           "slot": "WeaponA2"
//         },
//         {
//           "id": 18,
//           "slot": "WeaponB1"
//         },
//         {
//           "id": 19,
//           "slot": "WeaponB2"
//         },
//         {
//           "id": 20,
//           "slot": "Sickle"
//         },
//         {
//           "id": 21,
//           "slot": "Pick"
//         },
//         {
//           "id": 22,
//           "slot": "Axe"
//         }
//       ]
//     };

//     systemUnderTest.parseCharacter(responseData);

//     expect(responseData.equipment.helmAquatic).toEqual({
//       id: 1,
//       slot: 'HelmAquatic'
//     });

//     expect(responseData.equipment.backpack).toEqual({
//       id: 2,
//       slot: 'Backpack'
//     });

//     expect(responseData.equipment.coat).toEqual({
//       id: 3,
//       slot: 'Coat'
//     });

//     expect(responseData.equipment.boots).toEqual({
//       id: 4,
//       slot: 'Boots'
//     });

//     expect(responseData.equipment.gloves).toEqual({
//       id: 5,
//       slot: 'Gloves'
//     });

//     expect(responseData.equipment.helm).toEqual({
//       id: 6,
//       slot: 'Helm'
//     });

//     expect(responseData.equipment.leggings).toEqual({
//       id: 7,
//       slot: 'Leggings'
//     });

//     expect(responseData.equipment.shoulders).toEqual({
//       id: 8,
//       slot: 'Shoulders'
//     });

//     expect(responseData.equipment.accessory1).toEqual({
//       id: 9,
//       slot: 'Accessory1'
//     });

//     expect(responseData.equipment.accessory2).toEqual({
//       id: 10,
//       slot: 'Accessory2'
//     });

//     expect(responseData.equipment.ring1).toEqual({
//       id: 11,
//       slot: 'Ring1'
//     });

//     expect(responseData.equipment.ring2).toEqual({
//       id: 12,
//       slot: 'Ring2'
//     });

//     expect(responseData.equipment.amulet).toEqual({
//       id: 13,
//       slot: 'Amulet'
//     });

//     expect(responseData.equipment.weaponAquaticA).toEqual({
//       id: 14,
//       slot: 'WeaponAquaticA'
//     });

//     expect(responseData.equipment.weaponAquaticB).toEqual({
//       id: 15,
//       slot: 'WeaponAquaticB'
//     });

//     expect(responseData.equipment.weaponA1).toEqual({
//       id: 16,
//       slot: 'WeaponA1'
//     });

//     expect(responseData.equipment.weaponA2).toEqual({
//       id: 17,
//       slot: 'WeaponA2'
//     });

//     expect(responseData.equipment.weaponB1).toEqual({
//       id: 18,
//       slot: 'WeaponB1'
//     });

//     expect(responseData.equipment.weaponB2).toEqual({
//       id: 19,
//       slot: 'WeaponB2'
//     });

//     expect(responseData.equipment.sickle).toEqual({
//       id: 20,
//       slot: 'Sickle'
//     });

//     expect(responseData.equipment.pick).toEqual({
//       id: 21,
//       slot: 'Pick'
//     });

//     expect(responseData.equipment.axe).toEqual({
//       id: 22,
//       slot: 'Axe'
//     });
//   });

// 	it ('should set hasWeaponSwap if the character class supports it', function () {
// 		var responseData = {
// 			profession: 'Warrior'
// 		};

// 		systemUnderTest.parseCharacter(responseData);

// 		// TODO: Finish !

// 		expect(responseData.hasWeaponSwap).toBe(true);
// 	});
// });
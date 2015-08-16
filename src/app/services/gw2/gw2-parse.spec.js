describe('gw2 parse service', function () {
	var systemUnderTest;

	beforeEach(module('gw2armory'));

	beforeEach(function() {
		inject(function(gw2ParseService) {
			systemUnderTest = gw2ParseService;
		});
	});

	it ('should not die if values arent available', function () {
		var item = {};

		systemUnderTest.parseItem(item);
	});

	it ('should parse vendor_value into gold silver copper', function () {
		var item = {
			vendor_value: 1243
		};

		systemUnderTest.parseItem(item);

		expect(item.gold).toBe(1);
		expect(item.silver).toBe(12);
		expect(item.copper).toBe(43);
	});

	it ('should parse vendor_value into 0 gold 0 silver 0 copper', function () {
		var item = {};

		systemUnderTest.parseItem(item);

		expect(item.gold).toBe(0);
		expect(item.silver).toBe(0);
		expect(item.copper).toBe(0);
	});

	it ('should parse account bound flag SoulBindOnUse', function () {
		var item = {
			flags: [
				'SoulBindOnUse'
			]
		};

		systemUnderTest.parseItem(item);

		expect(item.boundStatus).toBe('Soulbound');
	});

	it ('should parse account bound flag SoulbindOnAcquire', function () {
		var item = {
			flags: [
				'SoulbindOnAcquire'
			]
		};

		systemUnderTest.parseItem(item);

		expect(item.boundStatus).toBe('Soulbound');
	});

	it ('should parse account bound flag AccountBoundOnUse', function () {
		var item = {
			flags: [
				'AccountBoundOnUse'
			]
		};

		systemUnderTest.parseItem(item);

		expect(item.boundStatus).toBe('Accountbound');
	});

	it ('should parse account bound flag AccountBound', function () {
		var item = {
			flags: [
				'AccountBoundOnUse'
			]
		};

		systemUnderTest.parseItem(item);

		expect(item.boundStatus).toBe('Accountbound');
	});

	it ('should parse infix description', function () {
		var item = {
			details: {
				infix_upgrade: {
					buff: {
						description: '+6\n+5\n+4'
					}
				}
			}
		};

		systemUnderTest.parseItem(item);

		expect(item.details.infix_upgrade.buff.description).toEqual(['+6', '+5', '+4']);
	});

	it ('should parse valid types to have available slot one', function () {
		var validTypes = [
			'Weapon',
			'Armor',
			'Trinket',
			'Accessory',
			'Amulet',
			'Back'
		];

		validTypes.forEach(function (type) {
			var item = {
				type: type
			};

			systemUnderTest.parseItem(item);

			expect(item.has_slot_one).toBe(true);
		});
	});

	it ('should parse valid weapon types to have available slot two', function () {
		var validTypes = [
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
			var item = {
				type: 'Weapon',
				details: {
					type: type
				}
			};

			systemUnderTest.parseItem(item);

			expect(item.has_slot_one).toBe(true);
			expect(item.has_slot_two).toBe(true);
		});
	});
});
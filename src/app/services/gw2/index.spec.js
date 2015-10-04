'use strict';

import gw2 from './index';

describe('gw2 service', () => {
	describe('base attribute calculator', () => {
		it('should return 37 for lvl 1', () => {
			let baseAttribute = gw2.calculateBaseAttribute(1);
			expect(baseAttribute).toBe(37);
		});

		it('should return 37 for lvl 40', () => {
			let baseAttribute = gw2.calculateBaseAttribute(40);
			expect(baseAttribute).toBe(325);
		});

		it('should return 1000 for lvl 80', () => {
			let baseAttribute = gw2.calculateBaseAttribute(80);
			expect(baseAttribute).toBe(1000);
		});
	});

	describe('health calc', () => {
		it('should throw if profession is not handled', () => {
			expect(() => {
				gw2.calculateBonusHealth(1, 'fake');
			}).toThrow('Profession not handled');
		});

		describe('high', () => {
			['Warrior', 'Necromancer'].forEach((profession) => {
				it('should return expected hp for 1', () => {
					let actual = gw2.calculateBonusHealth(1, profession);

					expect(actual).toBe(28);
				}); 

				it('should return expected hp for 40', () => {
					let actual = gw2.calculateBonusHealth(40, profession);

					expect(actual).toBe(2072);
				}); 

				it('should return expected hp for 80', () => {
					let actual = gw2.calculateBonusHealth(80, profession);

					expect(actual).toBe(9212);
				}); 
			});
		});

		describe('medium', () => {
			['Engineer', 'Ranger', 'Mesmer', 'Revenant'].forEach((profession) => {
				it('should return expected hp for 1', () => {
					let actual = gw2.calculateBonusHealth(1, profession);

					expect(actual).toBe(18);
				}); 

				it('should return expected hp for 40', () => {
					let actual = gw2.calculateBonusHealth(40, profession);

					expect(actual).toBe(1332);
				}); 

				it('should return expected hp for 80', () => {
					let actual = gw2.calculateBonusHealth(80, profession);

					expect(actual).toBe(5922);
				}); 
			});
		});

		describe('low', () => {
			['Guardian', 'Thief', 'Elementalist'].forEach((profession) => {
				it('should return expected hp for 1', () => {
					let actual = gw2.calculateBonusHealth(1, profession);

					expect(actual).toBe(5);
				}); 

				it('should return expected hp for 40', () => {
					let actual = gw2.calculateBonusHealth(40, profession);

					expect(actual).toBe(370);
				}); 

				it('should return expected hp for 80', () => {
					let actual = gw2.calculateBonusHealth(80, profession);

					expect(actual).toBe(1645);
				}); 
			});
		});
	});

	describe('parsers', () => {
		it('should parse bonuses up to the specified count', () => {
			let bonuses = [
				'+15 Power',
				'+25 Precision', 
				'+30 Toughness'
			];

			let actual = gw2.parseRuneBonuses(bonuses, 2);

			expect(actual).toEqual({
				Power: 15,
				Precision: 25
			});
		});

		it('should parse upgrade buffs as expected', () => {
			let buffs = [
				'+15 Power',
				'+25 Precision', 
				'+30 Toughness',
				'+20 Vitality',
				'+12% Boon Duration',
				'+15% Condition Damage', 
				'+13% Condition Duration',
				'+11 Ferocity',
				'+10 Healing Power',
				'+3% Critical Chance',
				'+20 Health'
			];

			let actual = gw2.parseUpgradeBuffs(buffs);

			expect(actual).toEqual({
				Power: 15,
				Precision: 25,
				Toughness: 30,
				Vitality: 20,
				BoonDuration: 12,
				ConditionDamage: 15,
				ConditionDuration: 13,
				Ferocity: 11,
				HealingPower: 10,
				CriticalChance: 3,
				Health: 20
			});
		});
	});
});
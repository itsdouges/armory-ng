'use strict';

import gw2 from './index';

describe('gw2 service', () => {
	describe('base attribute calculator', () => {
		it('should return 37 for lvl 1', () => {
			let baseAttribute = gw2.calculateBaseAttribute(1);
			expect(37).toBe(baseAttribute);
		});

		it('should return 1000 for lvl 80', () => {
			let baseAttribute = gw2.calculateBaseAttribute(80);
			expect(1000).toBe(baseAttribute);
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
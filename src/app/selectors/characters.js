import { calculateBaseAttribute, parseRuneBonuses, parseUpgradeBuffs } from '../services/gw2';
import { createSelector } from 'reselect';

const getMyCharacters = state => state.user.characters;
const getColumns = state => state.window.columns;
const fetchingCharacter = state => state.characters.fetching;
const getGw2ItemsData = state => state.gw2.items.data;
const getGw2SkinsData = state => state.gw2.skins.data;
const getFetchingGw2Data = state => state.gw2.items.fetching || state.gw2.skins.fetching; 
const getTooltipOpen = state => state.gw2.tooltip.open;

const getSelectedCharacter = state => {
	return state.characters.data[state.characters.selected];
};

const getIHaveCharacters = state => {
	let has = !state.user.characters || !state.user.characters.length;

	return !has;
};

export const myCharactersSelector = createSelector(
	getMyCharacters,
	getIHaveCharacters,
	getColumns,
	(characters, hasCharacters, columns) => {
		return {
			characters,
			hasCharacters,
			columns
		};
	}
);

// TODO: Figure out what to do for bonus count. Probably 
// can just total amount of runes, since there will be multiples.. !


const getItemAttributes = (state) => {
	let selectedCharacter = getSelectedCharacter(state);

	let attributes = {
		Power: 0
	};

	for (let equip in selectedCharacter.equipment) {
		if (!selectedCharacter.equipment.hasOwnProperty(equip)) {
			continue;
		}

		let equipObject = selectedCharacter.equipment[equip];
		if (!equipObject) {
			continue;
		}

		if (!state.gw2.items.data[equipObject.id] ||
				!state.gw2.items.data[equipObject.id].details ||
				!state.gw2.items.data[equipObject.id].details.infix_upgrade) {
			continue;
		}

		// exclude water weapons/helms
		if (state.gw2.items.data[equipObject.id].details.type === 'Trident' || 
				state.gw2.items.data[equipObject.id].details.type === 'HelmAcquatic') {
			continue;
		}

		let itemAttributes = state.gw2.items.data[equipObject.id].details.infix_upgrade.attributes
		itemAttributes.forEach((attribute) => {
			if (!attributes[attribute.attribute]) {
				attributes[attribute.attribute] = attribute.modifier;
			} else {
				attributes[attribute.attribute] += attribute.modifier;
			}
		});

		if (!equipObject.upgrades) {
			continue;
		}

		equipObject.upgrades.forEach((upgrade) => {
			let item = state.gw2.items.data[upgrade];
			if (item.details.type === 'Rune') {
				let bonuses = parseRuneBonuses(item.details.bonuses);
				console.log(bonuses);
			} else {
				let bonuses = parseUpgradeBuffs(item.details.infix_upgrade.buff.description);
				console.log(bonuses);
			}
		});
	}

	return attributes;
};

const BASE_CRITICAL_DAMAGE = 150;
const getAttributes = (state) => {
	if (getFetchingGw2Data(state)) {
		return;
	}

	let selectedCharacter = getSelectedCharacter(state);
	if (!selectedCharacter) {
		return;
	}

	let base = calculateBaseAttribute(selectedCharacter.level);
	let itemBonus = getItemAttributes(state);

	console.log(itemBonus);

	return {
		// Primary
		power: base + itemBonus.Power,
		precision: base + itemBonus.Precision,
		toughness: base,
		vitality: base,

		// Secondary
		boon: itemBonus.Boon,
		conditionDamage: itemBonus.ConditionDamage,
		conditionDuration: itemBonus.ConditionDuration,
		ferocity: itemBonus.Ferocity,
		healing: itemBonus.HealingPower,

		// Derived
		armor: base + itemBonus.Armor,
		criticalChance: '?????',
		criticalDamage: BASE_CRITICAL_DAMAGE + Math.floor(itemBonus.Ferocity / 15),
		health: (base * 10),

		// Special
		agony: '???',
		magicFind: '???',

		// Profession
		profession: '???'
	};
};

export const characterViewerSelector = createSelector(
	fetchingCharacter,
	getSelectedCharacter,
	getGw2ItemsData,
	getGw2SkinsData,
	getFetchingGw2Data,
	getAttributes,
	(fetching, selected, items, skins, fetchingGw2Data, attributes) => {
		return {
			fetching,
			selected,
			items,
			skins,
			fetchingGw2Data,
			attributes
		};
	}
);
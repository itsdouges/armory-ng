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

const BEGINNING_STAT = 37;
function calculateBaseAttribute (level) {
	let stat = BEGINNING_STAT;

	if (level === 80) {
		return 1000;
	}

	// TODO: Figure out base forumla. Wiki is incorrect?

	for (let i = 2; i <= level; i += 2) {
		if (i <= 10) {
			stat += 7;
		} else if (i < 21) {
			stat += 10;
		} else if (i < 25) {
			stat += 14;
		} else if (i < 27) {
			stat += 15;
		} else if (i < 31) {
			stat += 16;
		} else if (i < 41) {
			stat += 20;
		} else if (i < 45) {
			stat += 24;
		} else if (i < 47) {
			stat += 25;
		} else if (i < 51) {
			stat += 26;
		} else if (i < 61) {
			stat += 30;
		} else if (i < 65) {
			stat += 34;
		} else if (i < 67) {
			stat += 35;
		} else if (i < 71) {
			stat += 36;
		} else if (i < 75) {
			stat += 44;
		} else if (i < 77) {
			stat += 45;
		} else {
			stat += 46;
		}
	}

	return stat;
}

const getBonusAttributes = (state) => {
	let selectedCharacter = getSelectedCharacter(state);

	let bonusAttributes = {
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
			if (!bonusAttributes[attribute.attribute]) {
				bonusAttributes[attribute.attribute] = attribute.modifier;
			} else {
				bonusAttributes[attribute.attribute] += attribute.modifier;
			}
		});

		if (!equipObject.upgrades) {
			continue;
		}

		equipObject.upgrades.forEach((upgrade) => {

		});
	}

	console.log(bonusAttributes);

	return bonusAttributes;
};

const getAttributes = (state) => {
	if (getFetchingGw2Data(state)) {
		return;
	}

	let selectedCharacter = getSelectedCharacter(state);
	if (!selectedCharacter) {
		return;
	}

	let baseStat = calculateBaseAttribute(selectedCharacter.level);
	let bonusAttributes = getBonusAttributes(state);

	console.log(bonusAttributes);

	return {
		power: baseStat + bonusAttributes.Power,
		precision: baseStat + bonusAttributes.Precision,
		toughness: baseStat,
		vitality: baseStat,
		armor: baseStat // + equiparmordefence
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
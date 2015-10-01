import { createSelector } from 'reselect';

const getGw2ItemsData = state => state.gw2.items.data;
const getGw2SkinsData = state => state.gw2.skins.data;
const getFetchingGw2Data = state => state.gw2.items.fetching || state.gw2.skins.fetching || state.gw2.tooltip.fetching; 
const getTooltip = state => state.gw2.tooltip;

export const gw2DataSelector = createSelector(
	getGw2ItemsData,
	getGw2SkinsData,
	getFetchingGw2Data,
	(items, skins, fetching) => {
		return {
			items,
			skins,
			fetching
		};
	}
);

const getCurrentItem = state => state.gw2.items.data[state.gw2.tooltip.item];
const getCurrentSkin = state => state.gw2.skins.data[state.gw2.tooltip.skin];
const getTypeName = state => state.gw2.tooltip.item ? 'Currently Equipped' : state.gw2.tooltip.type;

const getMappedItem = (state) => {
	let item = getCurrentItem(state);
	let skin = getCurrentSkin(state);

	if (!item) {
		return undefined;
	}

	let mappedItem = {
		...item
	};

	if (skin) {
		mappedItem.icon = skin.icon;

		let regex = /[\w'\-]+/;
		let prefix = regex.exec(item.name);
		mappedItem.original_name = item.name;
		mappedItem.name = `${prefix} ${skin.name}`;
	}

	if (state.gw2.tooltip.upgrades) {
		let upgrade1 = state.gw2.items.data[state.gw2.tooltip.upgrades[0]];
		let upgrade2 = state.gw2.items.data[state.gw2.tooltip.upgrades[1]];

		console.log(upgrade1);

		upgrade1.upgrade_combo_count = state.gw2.tooltip.upgrade_combo_count;

		if (mappedItem.name.indexOf(upgrade1.details.suffix) < 0) {
			mappedItem.name += ` ${upgrade1.details.suffix}`;
		}

		mappedItem.details.upgrade_one = upgrade1;
		mappedItem.details.upgrade_two = upgrade2;
	}

	return mappedItem;
};

export const tooltipSelector = createSelector(
	getTooltip,
	getMappedItem,
	getFetchingGw2Data,
	getTypeName,
	(tooltip, item, fetching, typeName) => {
		return {
			tooltip,
			item,
			fetching,
			typeName
		};
	}
);
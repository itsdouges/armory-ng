'use strict';

function component () {
	let directive = {
		restrict: 'E',
		templateUrl: 'app/components/dumb/item-block/view.html',
		controller: ItemBlock,
		controllerAs: 'ctrl',
		scope: {},
		bindToController: {
			item: '=',
			slotName: '@',
			type: '@',
			icon: '@',
			fetching: '=',
			showTooltip: '&'
		}
	};

	return directive;
}

// TODO: Move logic into higher component
class ItemBlock {
	constructor () {
		this.typeBackground = this.buildTypeBackgroundUrl(this.type);
	}

	buildTypeBackgroundUrl (type) {
		if (type) {
			return `../assets/images/${type}-slot-icon.png`;
		}

		return '../assets/images/item-default-icon.png';
	}
}

export default component;
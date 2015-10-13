'use strict';

function component () {
	let directive = {
		restrict: 'E',
		template: require('./view.html'),
		controller: ItemUpgrade,
		controllerAs: 'ctrl',
		scope: {},
		bindToController: {
			upgrade: '='
		}
	};

	return directive;
}

// TODO: Move logic into higher component
class ItemUpgrade {
	constructor () {
		this.hasUpgrade = !!this.upgrade;

		if (this.hasUpgrade) {
			this.hasBonuses = !!this.upgrade.details.bonuses;
			this.hasBuffs = !!this.upgrade.details.infix_upgrade.buff;
		}
	}
}

export default component;
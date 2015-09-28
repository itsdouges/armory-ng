'use strict';

function directive () {
	let directive = {
		restrict: 'E',
		templateUrl: 'app/components/dumb/item-upgrade/view.html',
		controller: ItemUpgrade,
		controllerAs: 'ctrl',
		scope: {},
		bindToController: {
			upgrade: '='
		}
	};

	return directive;
}

class ItemUpgrade {
	constructor () {
		this.hasUpgrade = !!this.upgrade;

		if (this.hasUpgrade) {
			this.hasBonuses = !!this.upgrade.details.bonuses;
			this.hasBuffs = !!this.upgrade.details.infix_upgrade.buff;
		}
	}
}

export default directive;
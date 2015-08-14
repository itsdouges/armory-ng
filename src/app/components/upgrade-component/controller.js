'use strict';

function UpgradeComponent() {
	let vm = this;
	let upgradePassedIn;
	let hasBonuses;
	let hasBuffs;

	function init() {
		upgradePassedIn = !!vm.upgrade;

		if (upgradePassedIn) {
			hasBonuses = !!vm.upgrade.details.bonuses;
			hasBuffs = !!vm.upgrade.details.infix_upgrade.buff;
		}
	}

	init();

	vm.hasBonuses = () => {
		return hasBonuses;
	};

	vm.hasBuffs = () => {
		return hasBuffs;
	};

	vm.hasUpgrade = () => {
		return upgradePassedIn;
	};
}

export default UpgradeComponent;
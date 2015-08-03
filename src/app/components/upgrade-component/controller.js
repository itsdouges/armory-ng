// todo: unit test, im lazy whatever!

function UpgradeComponent() {
	let vm = this;
	let upgradePassedIn;

	function init() {
		upgradePassedIn = !!vm.upgrade;
	}

	init();

	vm.hasUpgrade = () => {
		return upgradePassedIn;
	};
}

export default UpgradeComponent;
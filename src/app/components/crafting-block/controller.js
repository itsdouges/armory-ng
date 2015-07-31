function CraftingBlockController() {
	let vm = this;

	// TODO: Test.. you lazy shit !

	function init() {
		if (vm.model.discipline === 'Chef' || 
			vm.model.discipline === 'Jewler') {
			vm.total = 400;
		} else {
			vm.total = 500;
		}
	}

	function calcWidthPercent() {
		let percent = (vm.model.rating / vm.total) || 0;

		return `${percent * 100}%`;
	}

	init();

	vm.calcWidth = calcWidthPercent;
}

export default CraftingBlockController;
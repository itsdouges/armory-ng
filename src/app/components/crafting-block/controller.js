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

		// todo: test
		vm.current = calcWidthPercent(vm.model.rating, vm.total);
	}

	function calcWidthPercent(rating, total) {
		let percent = (rating / total) || 0;

		return `${percent * 100}%`;
	}

	init();
}

export default CraftingBlockController;
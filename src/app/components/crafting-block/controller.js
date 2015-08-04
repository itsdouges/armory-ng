function CraftingBlockController() {
	let vm = this;

	function init() {
		if (vm.model.discipline === 'Chef' || 
			vm.model.discipline === 'Jewler') {
			vm.total = 400;
		} else {
			vm.total = 500;
		}

		vm.current = calcWidthPercent(vm.model.rating, vm.total);
	}

	function calcWidthPercent(rating, total) {
		let percent = Math.ceil((rating / total || 0) * 100);

		return `${percent}%`;
	}

	init();
}

export default CraftingBlockController;
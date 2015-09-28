'use strict';

function CraftingBlockDirective() {
	'ngInject';

	let directive = {
		restrict: 'E',
		templateUrl: 'app/components/dumb/crafting-block/view.html',
		controller: CraftingBlock,
		controllerAs: 'ctrl',
		scope: {},
		bindToController: {
			model: '='
		}
	};

	return directive;
}

class CraftingBlock {
	constructor () {
		if (this.model.discipline === 'Chef' || 
			this.model.discipline === 'Jeweler') {
			this.total = 400;
		} else {
			this.total = 500;
		}

		this.current = this.calcWidthPercent(this.model.rating, this.total);
	}

	calcWidthPercent (rating, total) {
		let percent = Math.ceil((rating / total || 0) * 100);

		return `${percent}%`;
	}

	isActive () {
		return !!this.model.active;
	}
}

export default CraftingBlockDirective;
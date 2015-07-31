function CraftingBlockDirective() {
	'ngInject';

	let directive = {
		restrict: 'E',
		templateUrl: 'app/components/crafting-block/view.html',
		controller: 'CraftingBlockController as ctrl',
		scope: {},
		bindToController: {
			model: '='
		}
	};

	return directive;
}

export default CraftingBlockDirective;
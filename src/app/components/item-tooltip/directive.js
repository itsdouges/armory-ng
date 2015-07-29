class ItemTooltipDirective {
	constructor() {
		'ngInject';

		let directive = {
			restrict: 'E',
			templateUrl: 'app/components/item-tooltip/view.html',
			controllerAs: 'ctrl',
			require: '^itemHolder'
		};

		return directive;
	}
}

export default ItemTooltipDirective;
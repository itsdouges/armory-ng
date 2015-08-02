function ItemTooltipDirective() {
	'ngInject';

	let directive = {
		restrict: 'E',
		templateUrl: 'app/components/item-tooltip/view.html',
		controller: 'ItemTooltipController as ctrl',
		scope: {},
		bindToController: {
			// skinId: '@',
			// itemId: '@',
			// upgrades: '=',
			item: '=',
			slotName: '@'
		}
	};

	return directive;
}

export default ItemTooltipDirective;
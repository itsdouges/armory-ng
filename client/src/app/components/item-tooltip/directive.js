'use strict';

function ItemTooltipDirective() {
	'ngInject';

	let directive = {
		restrict: 'E',
		templateUrl: 'app/components/item-tooltip/view.html',
		controller: 'ItemTooltipController as ctrl',
		scope: {},
		bindToController: {
			item: '=',
			slotName: '@'
		}
	};

	return directive;
}

export default ItemTooltipDirective;
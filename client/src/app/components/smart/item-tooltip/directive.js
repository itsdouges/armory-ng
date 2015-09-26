'use strict';

function ItemTooltipDirective() {
	'ngInject';

	let directive = {
		restrict: 'E',
		templateUrl: 'app/components/smart/item-tooltip/view.html',
		controller: 'ItemTooltipController as ctrl',
		scope: {}
	};

	return directive;
}

export default ItemTooltipDirective;
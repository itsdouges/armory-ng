'use strict';

function ItemDirective() {
	let directive = {
		restrict: 'E',
		templateUrl: 'app/components/dumb/item-block/view.html',
		controller: 'ItemBlockController as ctrl',
		scope: {},
		bindToController: {
			item: '=',
			slotName: '@',
			type: '@',
			icon: '@',
			fetching: '=',
			showTooltip: '&'
		}
	};

	return directive;
}

export default ItemDirective;
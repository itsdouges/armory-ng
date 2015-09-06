'use strict';

function ItemDirective() {
	'ngInject';

	let directive = {
		restrict: 'E',
		templateUrl: 'app/components/item-block/view.html',
		controller: 'ItemBlockController as ctrl',
		scope: {},
		bindToController: {
			item: '=',
			type: '@',
			mode: '@',
			slotName: '@'
		}
	};

	return directive;
}

export default ItemDirective;
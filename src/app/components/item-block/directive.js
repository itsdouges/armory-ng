function ItemDirective() {
	'ngInject';

	let directive = {
		restrict: 'E',
		templateUrl: 'app/components/item-block/view.html',
		controller: 'itemBlockController as ctrl',
		scope: {},
		bindToController: {
			item: '=',
			// itemId: '=',
			// skinId: '=',
			// upgrades: '=',
			type: '@', // TODO: Rename to slot type
			mode: '@',
			slotName: '@' // TODO: Rename to slot name
		}
	};

	return directive;
}

export default ItemDirective;
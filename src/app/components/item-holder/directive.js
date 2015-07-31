function ItemDirective() {
	'ngInject';

	let directive = {
		restrict: 'E',
		templateUrl: 'app/components/item-holder/view.html',
		controller: 'ItemHolderController',
		controllerAs: 'ctrl',
		scope: {},
		bindToController: {
			id: '=',
			type: '@'
		}
	};

	return directive;
}

export default ItemDirective;
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
			type: '@',
			mode: '@'
		}
	};

	return directive;
}

export default ItemDirective;
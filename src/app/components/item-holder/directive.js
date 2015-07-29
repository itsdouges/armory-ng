class ItemDirective {
	constructor () {
		'ngInject';

		let directive = {
			restrict: 'E',
			templateUrl: 'app/components/item-holder/view.html',
			controller: 'ItemHolderController',
			controllerAs: 'ctrl',
			scope: true,
			bindToController: {
				id: '='
			}
		};

		return directive;
	}
}

export default ItemDirective;
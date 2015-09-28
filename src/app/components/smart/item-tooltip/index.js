'use strict';

function ItemTooltipDirective () {
	'ngInject';

	let directive = {
		restrict: 'E',
		templateUrl: 'app/components/smart/item-tooltip/view.html',
		controller: ItemTooltip,
		controllerAs: 'ctrl',
		scope: {}
	};

	return directive;
}

import { tooltipSelector } from '../../../selectors/gw2-data';

class ItemTooltip {
	constructor ($ngRedux, $scope) {
		const unsubscribe = $ngRedux.connect(tooltipSelector)(this);
		$scope.$on('$destroy', unsubscribe);
	}
}

export default ItemTooltipDirective;
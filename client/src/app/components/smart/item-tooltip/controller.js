'use strict';

import { tooltipSelector } from '../../../selectors/gw2-data';

class ItemTooltip {
	constructor ($ngRedux, $scope) {
		const unsubscribe = $ngRedux.connect(tooltipSelector)(this);
		$scope.$on('$destroy', unsubscribe);
	}
}

export default ItemTooltip;
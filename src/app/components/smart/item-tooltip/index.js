'use strict';

function component () {
	let directive = {
		restrict: 'E',
		template: require('./view.html'),
		controller: ItemTooltip,
		controllerAs: 'ctrl',
		scope: {}
	};

	return directive;
}

import { tooltipSelector } from '../../../selectors/gw2-data';

class ItemTooltip {
	// @ngInject
	constructor ($ngRedux, $scope) {
		const unsubscribe = $ngRedux.connect(tooltipSelector)(this);
		$scope.$on('$destroy', unsubscribe);
	}
}

export default component;
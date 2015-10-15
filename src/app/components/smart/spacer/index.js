'use strict';

function component () {
	let directive = {
		restrict: 'E',
		scope: {},
		controller: Spacer,
		controllerAs: 'ctrl',
		template: `
			<div style="height: {{ ctrl.spacerHeight }};"></div>
		`
	};

	return directive;
}

import { spacerSelector } from '../../../selectors/window';

// @ngInject
function Spacer ($ngRedux, $scope) {
	const unsubscribe = $ngRedux.connect(spacerSelector)(this);
	$scope.$on('$destroy', unsubscribe);
}

export default component;
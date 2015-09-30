'use strict';

function component () {
	let directive = {
		restrict: 'E',
		scope: {},
		controller: Spacer,
		controllerAs: 'ctrl',
		templateUrl: 'app/components/smart/spacer/view.html'
	};

	return directive;
}

import { spacerSelector } from '../../../selectors/window';

function Spacer ($ngRedux, $scope) {
	const unsubscribe = $ngRedux.connect(spacerSelector)(this);
	$scope.$on('$destroy', unsubscribe);
}

export default component;
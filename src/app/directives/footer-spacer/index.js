'use strict';

import { spacerSelector } from '../../selectors/window';

function component () {
	let directive = {
		restrict: 'A',
		scope: {},
		controller: FooterSpacer,
		controllerAs: 'ctrl'
	};

	return directive;
}

// @ngInject
function FooterSpacer ($ngRedux, $scope, $element) {
	const unsubscribe = $ngRedux.connect(spacerSelector)((state, actions) => {
		$element[0].style.paddingBottom = state.spacerHeight;
	});

	$scope.$on('$destroy', unsubscribe);
}

export default component;
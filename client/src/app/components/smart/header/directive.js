'use strict';

function HeaderDirective() {
	let directive = {
		restrict: 'E',
		controller: 'HeaderController as ctrl',
		scope: {},
		templateUrl: 'app/components/smart/header/view.html'
	};

	return directive;
}

export default HeaderDirective;
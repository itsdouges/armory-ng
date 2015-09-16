'use strict';

function HeaderDirective() {
	let directive = {
		restrict: 'E',
		controller: 'HeaderController as ctrl',
		templateUrl: 'app/components/header/view.html'
	};

	return directive;
}

export default HeaderDirective;
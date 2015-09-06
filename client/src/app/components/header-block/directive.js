'use strict';

function HeaderDirective() {
	let directive = {
		restrict: 'E',
		controller: 'HeaderController as ctrl',
		templateUrl: 'app/components/header-block/view.html'
	};

	return directive;
}

export default HeaderDirective;
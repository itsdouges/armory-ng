'use strict';

function HeaderDirective() {
	let directive = {
		restrict: 'E',
		controller: 'HeaderController',
		templateUrl: 'app/components/header-block/view.html'
	};

	return directive;
}

export default HeaderDirective;
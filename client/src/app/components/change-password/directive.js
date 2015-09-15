'use strict';

function ChangePasswordDirective () {
	let directive = {
		restrict: 'E',
		controller: 'ChangePasswordController as ctrl',
		scope: {},
		templateUrl: 'app/components/change-password/view.html',
	};

	return directive;
}

export default ChangePasswordDirective;
'use strict';

function ChangePasswordDirective () {
	let directive = {
		restrict: 'E',
		controller: 'ChangePasswordController as ctrl',
		scope: {},
		templateUrl: 'app/components/smart/change-password/view.html',
	};

	return directive;
}

export default ChangePasswordDirective;
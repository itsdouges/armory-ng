'use strict';

function UserStatusDirective () {
	let directive = {
		restrict: 'E',
		controller: 'UserStatusController as ctrl',
		scope: {},
		templateUrl: 'app/components/user-status/view.html',
	};

	return directive;
}

export default UserStatusDirective;
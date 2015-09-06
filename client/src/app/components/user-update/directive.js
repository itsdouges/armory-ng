'use strict';

function UserUpdateDirective () {
	let directive = {
		restrict: 'E',
		controller: 'UserUpdateController as ctrl',
		scope: {},
		templateUrl: 'app/components/user-update/view.html',
	};

	return directive;
}

export default UserUpdateDirective;
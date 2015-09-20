'use strict';

function UserLinksDirective () {
	let directive = {
		restrict: 'E',
		controller: 'UserLinksController as ctrl',
		scope: {},
		templateUrl: 'app/components/user-links/view.html',
	};

	return directive;
}

export default UserLinksDirective;
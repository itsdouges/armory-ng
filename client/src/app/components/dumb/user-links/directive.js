'use strict';

function UserLinksDirective () {
	let directive = {
		restrict: 'E',
		controller: 'UserLinksController as ctrl',
		scope: {},
		bindToController: {
			logout: '&',
			loggedIn: '='
		},
		templateUrl: 'app/components/dumb/user-links/view.html',
	};

	return directive;
}

export default UserLinksDirective;
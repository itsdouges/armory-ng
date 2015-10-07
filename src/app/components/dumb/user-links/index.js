'use strict';

function component () {
	let directive = {
		restrict: 'E',
		controller: UserLinks,
		controllerAs: 'ctrl',
		scope: {},
		bindToController: {
			logout: '&',
			loggedIn: '=',
			username: '@'
		},
		templateUrl: 'app/components/dumb/user-links/view.html',
	};

	return directive;
}

class UserLinks {

}

export default component;
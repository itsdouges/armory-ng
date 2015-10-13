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
		template: require('./view.html')
	};

	return directive;
}

class UserLinks {

}

export default component;
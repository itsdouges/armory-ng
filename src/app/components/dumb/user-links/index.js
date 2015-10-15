'use strict';

import styles from './user-links.less';

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
		template: `
			<ul class="${styles.userLinks}" ng-if="!ctrl.loggedIn">
				<li><a title="Signup" href="/signup">signup</a></li>
				<li><a title="Signin" href="/login">signin</a></li>
			</ul>

			<ul class="${styles.userLinks}" ng-if="ctrl.loggedIn">
				<li><a title="Me" href="/me/characters">{{ ctrl.username }}</i></a></li>
				<li><a title="Settings" href="/settings">settings</a></li>
				<li><a title="Signout" ng-click="ctrl.logout()" href="">signout</a></li>
			</ul>
		`
	};

	return directive;
}

class UserLinks {
	
}

export default component;
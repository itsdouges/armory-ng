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
				<li><a title="Signup" ui-sref="main.no-auth.with-container.signup">signup</a></li>
				<li><a title="Signin" ui-sref="main.no-auth.with-container.login">signin</a></li>
			</ul>

			<ul class="${styles.userLinks}" ng-if="ctrl.loggedIn">
				<li><a title="Me" ui-sref="main.with-auth.characters">my characters</i></a></li>
				<li><a title="Settings" ui-sref="main.with-auth.with-container.settings">settings</a></li>
				<li><a title="Signout" ng-click="ctrl.logout()" href="">signout</a></li>
			</ul>
		`
	};

	return directive;
}

class UserLinks {
	
}

export default component;
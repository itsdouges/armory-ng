'use strict';

import styles from './user-links.less';

function component () {
	let directive = {
		restrict: 'E',
		controller: UserLinks,
		controllerAs: 'ctrl',
		scope: {},
		bindToController: {
			loggedIn: '=',
			username: '@',
			doSearch: '&'
		},
		template: `
			<ul class="${styles.userLinks}">
				<li><search-box do-search="ctrl.doSearch"></search-box></li>
				<li ng-if="!ctrl.loggedIn"><a title="Signup" ui-sref="main.no-auth.with-container.signup">signup</a></li>
				<li ng-if="!ctrl.loggedIn"><a title="Login" ui-sref="main.no-auth.with-container.login">login</a></li>
				<li ng-if="ctrl.loggedIn"><a title="Me" ui-sref="main.with-auth.me">{{ ctrl.username }}</i></a></li>
				<li ng-if="ctrl.loggedIn"><a title="Settings" ui-sref="main.with-auth.with-container.settings">settings</a></li>
			</ul>
		`
	};

	return directive;
}

class UserLinks {
	
}

export default component;
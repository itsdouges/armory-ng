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
			search: '&'
		},
		template: `
			<ul class="${styles.userLinks}">
				<li><search-box search="ctrl.search"></search-box></li>
				<li ng-if="!ctrl.loggedIn"><a title="Join" ui-sref="main.no-auth.with-container.signup">join</a></li>
				<li ng-if="!ctrl.loggedIn"><a title="Login" ui-sref="main.no-auth.with-container.login">login</a></li>
				<li ng-if="ctrl.loggedIn"><a title="Me" ui-sref="main.with-auth.me">{{ ctrl.username }}</i></a></li>
				<li ng-if="ctrl.loggedIn"><a title="Settings" ui-sref="main.with-auth.with-container.settings">settings</a></li>
			</ul>
		`
	};

	return directive;
}

class UserLinks {
	constructor () {
		this.search = this.search();
	}
}

export default component;
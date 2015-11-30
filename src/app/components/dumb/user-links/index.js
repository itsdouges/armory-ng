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
				<li class="${styles.searchBox}"><search-box search="ctrl.search"></search-box></li>
				<li ng-if="!ctrl.loggedIn"><a title="Join" ui-sref="main.no-auth.with-container.signup">join</a></li>
				<li ng-if="!ctrl.loggedIn"><a title="Login" ui-sref="main.no-auth.with-container.login">login</a></li>
				<li ng-if="ctrl.loggedIn">
					<avatar
						style="display: block;"
						title="Me"
						small-mode="true"
						link="/#!/me"
						image-location="http://api.adorable.io/avatars/20/{{ ctrl.username }}.png"></avatar>
				</li>
				<li ng-if="ctrl.loggedIn" class="${styles.hideWhenSmall}"><a title="Me" ui-sref="main.with-auth.me">{{ ctrl.username }}</i></a></li>
				<li ng-if="ctrl.loggedIn"><a title="Settings" ui-sref="main.with-auth.with-container.settings"><span class="${styles.hideWhenSmall}">settings</span><i class="fa fa-cog ${styles.showWhenSmall}"></i></a></li>
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
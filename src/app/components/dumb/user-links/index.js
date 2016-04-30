'use strict';

import styles from './user-links.less';
import logo from '../../../../assets/images/logo-small.png';

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
				<li>
					<a style="display: inherit;" title="Guild Wars 2 Armory" href="/">
						<h1 class="${styles.hide}">Guild Wars 2 Armory</h1>
						<img
							class="${styles.logo}" 
							src="${logo}" />
					</a>
				</li>
				<li class="${styles.searchBox}"><search-box search="ctrl.search"></search-box></li>
				<li ng-if="!ctrl.loggedIn"><a title="Join" ui-sref="main.no-auth.with-container.signup">join</a></li>
				<li ng-if="!ctrl.loggedIn"><a title="Login" ui-sref="main.no-auth.with-container.login">login</a></li>
				<li ng-if="ctrl.loggedIn">
					<a class="${styles.userNameLink}" title="Me" ui-sref="main.with-auth.me">
						<avatar
							title="Me"
							small-mode="true"
							link="/#!/me"
							image-location="//api.adorable.io/avatars/20/{{ ctrl.username }}.png"></avatar>

						<span class="${styles.username} ${styles.hideWhenSmall}">{{ ctrl.username }}</span>
					</a>
				</li>
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
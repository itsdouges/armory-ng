'use strict';

import { actionCreators } from '../../../actions/user/auth';
import { userDataSelector } from '../../../selectors/user';
import stateGo from 'redux-ui-router/lib/state-go';

import styles from './header.less';
import positionStyles from  '../../../styles/positioning/positioning.less';
import logoSrc from '../../../../assets/images/gw2-hot-1.png';

function component () {
	let directive = {
		restrict: 'E',
		controller: Header,
		controllerAs: 'ctrl',
		scope: {},
		template:`
			<div class="${styles.brushStroke}"></div>

			<h1 class="${styles.title}">
				<a title="Guild Wars 2 Armory" ui-sref="main.no-auth.with-container.home">
					<img class="${styles.logo}" src="${logoSrc}" />
					<span>Guild Wars 2 Armory</span>
				</a>
			</h1>

			<user-links
				class="${positionStyles.sticky} ${positionStyles.top} ${positionStyles.right}"
				logged-in="ctrl.user.loggedIn"
				logout="ctrl.logout()"
				username="{{ ctrl.user.alias }}"></user-links>
		`
	};

	return directive;
}

class Header {
	// @ngInject
	constructor ($ngRedux, $scope) {
		this.$ngRedux = $ngRedux;

		const unsubscribe = $ngRedux.connect(userDataSelector)(this);
		$scope.$on('$destroy', unsubscribe);
	}

	logout () {
		this.$ngRedux.dispatch(actionCreators.clearUserData());
		this.$ngRedux.dispatch(stateGo('main.no-auth.with-container.login'));
	};
}

export default component;
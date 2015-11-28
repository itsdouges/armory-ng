'use strict';

import { actionCreators } from '../../../actions/user/auth';
import { userDataSelector } from '../../../selectors/user';
import searchActions from '../../../actions/search';
import stateGo from 'redux-ui-router/lib/state-go';

import styles from './header.less';
import positionStyles from  '../../../styles/positioning/positioning.less';
import logoSrc from '../../../../assets/images/gw2-hot-4.png';

function component () {
	let directive = {
		restrict: 'E',
		controller: Header,
		controllerAs: 'ctrl',
		scope: {},
		template:`
			<div class="${styles.brushStroke}"></div>
			
			<a
			class="${styles.homeLink}"
			href="/"
			title="Home">
				<h1 class="${styles.title}">Guild Wars 2 Armory</h1>
			</a>

			<user-links
				search="ctrl.search"
				logged-in="ctrl.user.loggedIn"
				username="{{ ctrl.user.alias }}"></user-links>
		`
	};

	return directive;
}

// @ngInject
function Header ($ngRedux, $scope) {
	let that = this;

	function constructor () {
		const unsubscribe = $ngRedux.connect(userDataSelector)(that);
		$scope.$on('$destroy', unsubscribe);
	}

	function search (term) {
		$ngRedux.dispatch(searchActions.searchThunk(term));
	}

	this.search = search;
	constructor();
}

export default component;
'use strict';

import styles from './gw2-token.less';

function component () {
	let directive = {
		restrict: 'E',
		controller: Gw2Token,
		controllerAs: 'ctrl',
		scope: {},
		bindToController: {
			token: '=',
			removeToken: '&'
		},
		template: `
			<div ng-class="ctrl.token.invalid ? '${styles.invalid}' : ''">
				<div>
					<strong>{{ ::ctrl.token.accountName }}</strong>
					<span>(world: {{ ::ctrl.token.world }})</span>
				</div>

				<span ng-repeat="p in ::ctrl.token.permissions.split(',')">{{ p }} </span>
			</div>

			<a class="${styles.delete}" ng-click="ctrl.removeToken({ token: ctrl.token.token })" href=""><i class="fa fa-trash-o"></i></a>
		`
	};

	return directive;
}

class Gw2Token {
	constructor () {

	}
}

export default component;
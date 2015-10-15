'use strict';

import { actionCreators } from '../../../actions/user/data';
import { userDataSelector } from '../../../selectors/user';

import styles from './user-tokens.less';
import messageStyles from '../../../styles/message/message.less';
import formStyles from '../../../styles/forms/forms.less';

function component () {
	let directive = {
		restrict: 'E',
		controller: UserTokens,
		controllerAs: 'ctrl',
		scope: {},
		template: `
			<div class="${messageStyles.message}">
				Need api tokens? <a target="_blank" title="Opens in a new window" href="https://account.arena.net/applications/create"><strong>Head over to ArenaNet's applications page and create some<i class="fa fa-external-link"></i></strong></a> selecting the permissions you'd like. We suggest characters, inventories, builds, and pvp.
			</div>

			<gw2-token remove-token="ctrl.removeToken(token)" ng-repeat="token in ctrl.user.gw2Tokens" token="token" mode="view"></gw2-token>

			<form ng-submit="ctrl.addToken()">
				<div class="${formStyles.labelContainer}">
					<label for="add-token">Add token</label>
				</div>

				<div class="${formStyles.inputContainer}">
					<input placeholder="Add token" ng-disabled="ctrl.user.addingGw2Token" ng-change="ctrl.validateToken()" id="add-token" type="text" ng-model="ctrl.newGw2Token" required="required" />

					<input-validity
						data-busy="ctrl.user.validatingGw2Token"
						data-valid="ctrl.user.validGw2Token">
					</input-validity>
				</div>

				<div class="${formStyles.buttonGroup}">
					<busy-button button-disabled="!ctrl.user.validGw2Token" busy="ctrl.user.addingGw2Token">
						<i class="fa fa-plus"></i>
					</busy-button>
				</div>
			</form>
		`
	};

	return directive;
}

// @ngInject
function UserTokens ($ngRedux, $scope, debounce) {
	const unsubscribe = $ngRedux.connect(userDataSelector)(this);
	$scope.$on('$destroy', unsubscribe);
	$ngRedux.dispatch(actionCreators.fetchGw2TokensThunk());

	this.addToken = () => {
		$ngRedux.dispatch(actionCreators.addGw2TokenThunk(this.newGw2Token));
	}.bind(this);

	this.removeToken = (token) => {
		$ngRedux.dispatch(actionCreators.removeGw2TokenThunk(token));
	};

	let tokenDebounce;
	this.validateToken = () => {
		if (this.user.validGw2Token) {
			$ngRedux.dispatch(actionCreators.invalidateGw2Token());
		}

		tokenDebounce = tokenDebounce || debounce.func(() => {
			$ngRedux.dispatch(actionCreators.validateGw2TokenThunk(this.newGw2Token));
		}.bind(this));

		tokenDebounce();
	}.bind(this);
}

export default component;
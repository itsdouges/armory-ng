'use strict';

import { actionCreators } from '../../../actions/user/data';
import { userDataSelector } from '../../../selectors/user';

function component () {
	let directive = {
		restrict: 'E',
		controller: UserTokens,
		controllerAs: 'ctrl',
		scope: {},
		templateUrl: 'app/components/smart/user-tokens/view.html',
	};

	return directive;
}

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
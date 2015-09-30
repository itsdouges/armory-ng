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
	let scope = this;

	const unsubscribe = $ngRedux.connect(userDataSelector)(scope);
	$scope.$on('$destroy', unsubscribe);
	$ngRedux.dispatch(actionCreators.fetchGw2TokensThunk());

	scope.addToken = () => {
		$ngRedux.dispatch(actionCreators.addGw2TokenThunk(scope.newGw2Token));
	}

	scope.removeToken = (token) => {
		$ngRedux.dispatch(actionCreators.removeGw2TokenThunk(token));
	};

	let tokenDebounce;
	scope.validateToken = () => {
		if (scope.user.validGw2Token) {
			$ngRedux.dispatch(actionCreators.invalidateGw2Token());
		}

		tokenDebounce = tokenDebounce || debounce.func(() => {
			$ngRedux.dispatch(actionCreators.validateGw2TokenThunk(scope.newGw2Token));
		});

		tokenDebounce();
	}
}

export default component;
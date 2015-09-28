'use strict';

import { actionCreators } from '../../../actions/user';
import { userDataSelector } from '../../../selectors/user';

function ChangeAliasDirective () {
	let directive = {
		restrict: 'E',
		controller: ChangeAlias,
		controllerAs: 'ctrl',
		scope: {},
		templateUrl: 'app/components/smart/change-alias/view.html',
	};

	return directive;
}

function ChangeAlias ($ngRedux, $scope, debounce) {
	let scope = this;

	const unsubscribe = $ngRedux.connect(userDataSelector)(this);
	$scope.$on('$destroy', unsubscribe);

	var checkAliasDebounce;
	this.checkAlias = () => {
		if (scope.user.aliasValid) {
			$ngRedux.dispatch(actionCreators.invalidateAlias());
		}

		checkAliasDebounce = checkAliasDebounce || debounce.func(() => {
			$ngRedux.dispatch(actionCreators.checkAliasThunk(scope.user.alias));
		});

		checkAliasDebounce();
	};

	this.saveAlias = () => {
		$ngRedux.dispatch(actionCreators.saveAliasThunk(scope.user.alias));
	};
}

export default ChangeAliasDirective;
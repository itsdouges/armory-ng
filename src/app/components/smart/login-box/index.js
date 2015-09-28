'use strict';

import { actionCreators } from '../../../actions/user';

function LoginDirective () {
	let directive = {
		restrict: 'E',
		controller: LoginBox,
		controllerAs: 'ctrl',
		templateUrl: 'app/components/smart/login-box/view.html',
		scope: {}
	};

	return directive;
}

function LoginBox ($ngRedux, $scope) {
	const unsubscribe = $ngRedux.connect(selector)(this);
	$scope.$on('$destroy', unsubscribe);

	let scope = this;

	this.login = () => {
		$ngRedux.dispatch(actionCreators.fetchTokenThunk(scope.email, scope.password));
	};

	function selector (state) {
		return {
			fetchingToken: state.user.fetchingToken
		};
	};
}

export default LoginDirective;
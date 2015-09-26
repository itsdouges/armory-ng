'use strict';

import { actionCreators } from '../../../actions/user';

function LoginController($ngRedux, $scope) {
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

export default LoginController;
'use strict';

import { actionCreators } from '../../actions/user';

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

	// scope.login = function () {
	// 	var user = scope.user;

	// 	if (!user || !user.email || !user.password) {
	// 		return;
	// 	}

	// 	scope.loading = true;

	// 	return authService
	// 		.login(scope.user.email, scope.user.password)
	// 		.then(null, loginFailure);
	// };

	// function loginFailure(errorMessage) {
	// 	console.log(errorMessage);
		
	// 	scope.error = errorMessage;
	// 	scope.loading = false;
	// }
}

export default LoginController;
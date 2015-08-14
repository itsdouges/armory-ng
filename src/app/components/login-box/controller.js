'use strict';

function LoginController(authService, $state) {
	var scope = this;

	scope.login = function () {
		var user = scope.user;

		if (!user || !user.email || !user.password) {
			return;
		}

		scope.loading = true;

		authService
			.login(scope.user.email, scope.user.password)
			.then(null, loginFailure);
	};

	function loginFailure(errorMessage) {
		scope.error = errorMessage;
		scope.loading = false;
	}
}

export default LoginController;
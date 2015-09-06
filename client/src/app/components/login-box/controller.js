'use strict';

function LoginController(authService, $state) {
	var scope = this;

	scope.login = function () {
		var user = scope.user;

		if (!user || !user.email || !user.password) {
			return;
		}

		scope.loading = true;

		return authService
			.login(scope.user.email, scope.user.password)
			.then(null, loginFailure);
	};

	function loginFailure(errorMessage) {
		console.log(errorMessage);
		
		scope.error = errorMessage;
		scope.loading = false;
	}
}

export default LoginController;
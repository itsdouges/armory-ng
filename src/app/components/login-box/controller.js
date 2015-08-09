function LoginController(usersService) {
	var scope = this;

	scope.login = function () {
		var user = scope.user;

		if (!user || !user.email || !user.password) {
			return;
		}

		scope.loading = true;

		usersService
			.login(scope.user.email, scope.user.password)
			.then(loginSuccess, loginFailure);
	};

	function loginSuccess(user) {
		if (user.validToken) {
			// redirect to home
		} else {
			// redirect to user token page
		}
	}

	function loginFailure(errorMessage) {
		scope.error = errorMessage;
		scope.loading = false;
	}
}

export default LoginController;
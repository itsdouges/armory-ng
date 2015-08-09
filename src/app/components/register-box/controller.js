function RegisterController(usersService, gw2ApiService) {
	var scope = this;

	function init() {
		scope.user = {};
	}

	function registerSuccess(user) {
		// redirect to home screen (or something ?);
	}

	function registerFailure(errorMessage) {
		scope.error = errorMessage;

		scope.loading = false;
	}

	this.validateUser = function () {
		if (scope.user.emailAvailable &&
			scope.user.aliasAvailable &&
			scope.user.tokenValid &&
			scope.user.passwordsValid) {
			return true;
		}

		return false;
	}

	this.sendData = function () {
		if (!scope.validateUser()) {
			return;
		}

		scope.loading = true;
console.log('loading bro');
		usersService
			.register(scope.user)
			.then(registerSuccess, registerFailure);
	};

	function checkEmailSuccess(isAvailable) {
		scope.emailLoading = false;
		scope.user.emailAvailable = isAvailable;
	}

	function checkEmailFailure(errorMessage) {
		scope.emailLoading = false;
		scope.user.emailAvailable = false;
		scope.error = errorMessage;
	}

	this.checkEmail = function() {
		if (!scope.user.email) {
			return;
		}

		scope.user.emailAvailable = false;
		scope.emailLoading = true;

		usersService
			.checkEmail(scope.user.email)
			.then(checkEmailSuccess, checkEmailFailure);
	};

	function checkTokenSuccess(valid) {
		scope.tokenLoading = false;
		scope.user.tokenValid = valid;
	}

	function checkTokenFailure(errorMessage) {
		scope.tokenLoading = false;
		scope.user.tokenValid = false;
		scope.error = errorMessage;
	}

	this.checkToken = function() {
		if (!scope.user.token) {
			return;
		}

		scope.user.tokenValid = false;
		scope.tokenLoading = true;

		gw2ApiService
			.checkToken(scope.user.token)
			.then(checkTokenSuccess, checkTokenFailure);
	};

	function checkAliasSuccess(isAvailable) {
		scope.aliasLoading = false;
		scope.user.aliasAvailable = isAvailable;
	}

	function checkAliasFailure(errorMessage) {
		scope.aliasLoading = false;
		scope.user.aliasAvailable = false;
		scope.error = errorMessage;
	}

	this.checkAlias = function() {
		if (!scope.user.alias) {
			return;
		}

		scope.user.aliasAvailable = false;
		scope.aliasLoading = true;

		usersService
			.checkAlias(scope.user.alias)
			.then(checkAliasSuccess, checkAliasFailure);
	};

	this.checkPasswords = function() {
		var password1 = scope.user.password1;
		var password2 = scope.user.password2;

		if (!password || !password2) {
			scope.user.passwordsValid = false;
		} else if (password1 === password2) {
			scope.user.passwordsValid = true;
		} else {
			scope.user.passwordsValid = false;
		}

		// TODO: Password regex here.
	};

	init();
}

export default RegisterController;
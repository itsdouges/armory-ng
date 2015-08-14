'use strict';

function RegisterController(registrationService, gw2ApiService, $state, debounce) {
	var scope = this;

	function init() {
		scope.user = {};
	}

	function registerFailure() {
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
		
		registrationService
			.register(scope.user)
			.then(null, registerFailure);
	};

	function checkEmailSuccess(isAvailable) {
		scope.emailLoading = false;
		scope.user.emailAvailable = isAvailable;
	}

	function checkEmailFailure() {
		scope.emailLoading = false;
		scope.user.emailAvailable = false;
	}

	this.checkEmail = debounce.func(function() {
		if (!scope.user.email) {
			return;
		}

		scope.user.emailAvailable = false;
		scope.emailLoading = true;

		registrationService
			.checkEmail(scope.user.email)
			.then(checkEmailSuccess, checkEmailFailure);
	});

	function checkTokenSuccess(valid) {
		scope.tokenLoading = false;
		scope.user.tokenValid = valid;
	}

	function checkTokenFailure(errorMessage) {
		scope.tokenLoading = false;
		scope.user.tokenValid = false;
	}

	this.checkToken = debounce.func(function() {
		if (!scope.user.token) {
			return;
		}

		scope.user.tokenValid = false;
		scope.tokenLoading = true;

		gw2ApiService
			.checkToken(scope.user.token)
			.then(checkTokenSuccess, checkTokenFailure);
	});

	function checkAliasSuccess(isAvailable) {
		scope.aliasLoading = false;
		scope.user.aliasAvailable = isAvailable;
	}

	function checkAliasFailure(errorMessage) {
		scope.aliasLoading = false;
		scope.user.aliasAvailable = false;
	}

	this.checkAlias = debounce.func(function() {
		if (!scope.user.alias) {
			return;
		}

		scope.user.aliasAvailable = false;
		scope.aliasLoading = true;

		registrationService
			.checkAlias(scope.user.alias)
			.then(checkAliasSuccess, checkAliasFailure);
	});

	this.checkPasswords = debounce.func(function() {
		var password1 = scope.user.password1;
		var password2 = scope.user.password2;

		if (!password1 || !password2) {
			scope.user.passwordsValid = false;
		} else if (password1 === password2) {
			scope.user.passwordsValid = true;
		} else {
			scope.user.passwordsValid = false;
		}

		// TODO: Password regex here.
	}, 100);

	init();
}

export default RegisterController;
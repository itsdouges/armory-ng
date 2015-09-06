'use strict';

function RegisterController(userService, gw2Service, $state, debounce, authService) {
	let scope = this;

	function init() {
		scope.user = {};
	}

	function registerFailure() {
		scope.loading = false;
	}

	this.validateUser = function () {
		if (scope.user.emailAvailable &&
			scope.user.aliasAvailable &&
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
		
		userService
			.register(scope.user)
			.then(function () {
				// TODO: test
				return authService.login(scope.user.email, scope.user.password);
			}, registerFailure);
	};

	function checkEmailSuccess() {
		scope.emailLoading = false;
		scope.user.emailAvailable = true;
	}

	function checkEmailFailure(messages) {
		scope.emailLoading = false;
		scope.user.emailAvailable = false;
	}

	let checkEmailDebounce;
	this.checkEmail = function () {
		scope.user.emailAvailable = false;

		checkEmailDebounce = checkEmailDebounce || debounce.func(function() {
				if (!scope.user.email) {
					return;
				}

				scope.emailLoading = true;

				userService 
					.checkEmail(scope.user.email)
					.then(checkEmailSuccess, checkEmailFailure);
			});

		checkEmailDebounce();
	};

	function checkAliasSuccess() {
		scope.aliasLoading = false;
		scope.user.aliasAvailable = true;
	}

	function checkAliasFailure(messages) {
		scope.aliasLoading = false;
		scope.user.aliasAvailable = false;
	}

	var checkAliasDebounce;
	this.checkAlias = function () {
		scope.user.aliasAvailable = false;

		checkAliasDebounce = checkAliasDebounce || debounce.func(function() {
				if (!scope.user.alias) {
					return;
				}

				scope.aliasLoading = true;

				userService
					.checkAlias(scope.user.alias)
					.then(checkAliasSuccess, checkAliasFailure);
			});

		checkAliasDebounce();
	};

	this.checkPasswords = debounce.func(function() {
		let password1 = scope.user.password;
		let password2 = scope.user.password2;

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
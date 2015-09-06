'use strict';

function Gw2TokenController (userService, debounce, $scope) {
	let scope = this;

	this.isMode = (mode) => {
		return scope.mode === mode;
	};

	function checkTokenSuccess() {
		scope.busy = false;
		scope.token.valid = true;
	}

	function checkTokenFailure(messages) {
		scope.busy = false;
		scope.token.valid = false;
		scope.message = messages[0];
	}

	this.saveToken = () => {
		if (!scope.token.valid) {
			return;
		}

		scope.busy = true;

		$scope.$emit('token-added', scope.token);

		userService
			.addToken(scope.token.token)
			.then(() => {
				scope.token.valid = false;
				scope.token.token = undefined;
				scope.busy = false;

				console.log('added');
			});
	};

	this.deleteToken = () => {
		scope.busy = true;

		userService
			.deleteToken(scope.token.token)
			.then(() => {
				console.log('deleted');
				$scope.$emit('token-deleted', scope.token);
			});
	};

	var checkTokenDebounce;
	this.checkToken = () => {
		scope.token.valid = false;
		scope.message = undefined;

		checkTokenDebounce = checkTokenDebounce || debounce.func(() => {
				if (!scope.token.token) {
					return;
				}

				scope.busy = true;

				userService
					.checkToken(scope.token.token)
					.then(checkTokenSuccess, checkTokenFailure);
			});

		checkTokenDebounce();
	};

	function init () {
		scope.token = scope.token || {};
	}

	init();
}

export default Gw2TokenController;
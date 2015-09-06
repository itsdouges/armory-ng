'use strict';

function Gw2TokenController (userService, debounce) {
	let scope = this;

	this.isMode = (mode) => {
		return scope.mode === mode;
	};

	function checkTokenSuccess() {
		scope.busy = false;
		scope.token.isValid = true;
	}

	function checkTokenFailure(messages) {
		scope.busy = false;
		scope.token.isValid = false;
		scope.message = messages[0];
	}

	this.saveToken = () => {
		if (!ctrl.token.isValid) {
			return;
		}


	};

	var checkTokenDebounce;
	this.checkToken = () => {
		scope.token.isValid = false;
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
}

export default Gw2TokenController;
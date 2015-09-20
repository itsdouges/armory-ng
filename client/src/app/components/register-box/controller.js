'use strict';

import { actionCreators } from '../../actions/user';
import { registerSelector } from '../../selectors/user';

function RegisterController(userService, gw2Service, $state, debounce, authService, $ngRedux, $scope) {
	let scope = this;

	const unsubscribe = $ngRedux.connect(registerSelector)(this);
	$scope.$on('$destroy', unsubscribe);

	function init () {
		scope.inputs = {};
	}

	function registerFailure (message) {
		scope.loading = false;
		scope.errors.message = message;
	}

	this.sendData = function () {
		if (!scope.validateUser()) {
			return;
		}

		scope.errors.message = undefined;
		scope.loading = true;
		
		userService
			.register(scope.user)
			.then(function () {
				// TODO: test
				return authService.login(scope.user.email, scope.user.password);
			}, registerFailure);
	};

	let checkEmailDebounce;
	this.checkEmail = () => {
		$ngRedux.dispatch(actionCreators.invalidateEmail());

		checkEmailDebounce = checkEmailDebounce || debounce.func(() => {
			$ngRedux.dispatch(actionCreators.validateEmailThunk(scope.inputs.email));
		});

		checkEmailDebounce();
	};

	var checkAliasDebounce;
	this.checkAlias = () => {
		$ngRedux.dispatch(actionCreators.invalidateAlias());

		checkAliasDebounce = checkAliasDebounce || debounce.func(() => {
			$ngRedux.dispatch(actionCreators.checkAliasThunk(scope.inputs.alias));
		});

		checkAliasDebounce();
	};

	this.checkPasswords = debounce.func(() => {
		let action = actionCreators.checkPasswords(scope.inputs.password1, scope.inputs.password2);
		$ngRedux.dispatch(action);
	}, 100);

	init();
}

export default RegisterController;
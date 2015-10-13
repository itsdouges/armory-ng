'use strict';

function component () {
	let directive = {
		restrict: 'E',
		controller: RegisterBox,
		controllerAs: 'ctrl',
		template: require('./view.html'),
		bindToController: {
			state: '@'
		}, 
		scope: {}
	};

	return directive;
}

import { actionCreators } from '../../../actions/user';
import { registerSelector } from '../../../selectors/user';

// @ngInject
function RegisterBox (debounce, $ngRedux, $scope) {
	let scope = this;

	const unsubscribe = $ngRedux.connect(registerSelector)(this);
	$scope.$on('$destroy', unsubscribe);

	function init () {
		scope.inputs = {};
	}

	this.register = () => {
		$ngRedux.dispatch(actionCreators.registerThunk(scope.user));
	};

	let checkEmailDebounce;
	this.checkEmail = () => {
		if (scope.user.emailValid) {
			$ngRedux.dispatch(actionCreators.invalidateEmail());
		}

		checkEmailDebounce = checkEmailDebounce || debounce.func(() => {
			$ngRedux.dispatch(actionCreators.validateEmailThunk(scope.inputs.email));
		});

		checkEmailDebounce();
	};

	var checkAliasDebounce;
	this.checkAlias = () => {
		if (scope.user.aliasValid) {
			$ngRedux.dispatch(actionCreators.invalidateAlias());
		}

		checkAliasDebounce = checkAliasDebounce || debounce.func(() => {
			$ngRedux.dispatch(actionCreators.checkAliasThunk(scope.inputs.alias));
		});

		checkAliasDebounce();
	};

	this.checkPasswords = debounce.func(() => {
		let action = actionCreators.checkPasswords(scope.inputs.password1, scope.inputs.password2);
		$ngRedux.dispatch(action);
	}, 500);

	init();
}

export default component;
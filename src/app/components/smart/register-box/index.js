import { actionCreators } from '../../../actions/user';
import { registerSelector } from '../../../selectors/user';

import styles from './register-box.less';
import forms from '../../../styles/forms/forms.less';
import message from '../../../styles/message/message.less';

function component () {
	let directive = {
		restrict: 'E',
		controller: RegisterBox,
		controllerAs: 'ctrl',
		template: `
			<form ng-submit="ctrl.register()">
				<textbox
					label="Email"
					on-change="ctrl.checkEmail"
					control-id="register-email"
					ng-model="ctrl.inputs.email"
					required="true"
					is-busy="ctrl.user.emailValidating"
					is-valid="ctrl.user.emailValid"
					error="ctrl.user.emailErrors[0]"></textbox>

				<textbox
					label="Alias"
					on-change="ctrl.checkAlias"
					control-id="register-alias"
					ng-model="ctrl.inputs.alias"
					required="true"
					is-busy="ctrl.user.aliasValidating"
					is-valid="ctrl.user.aliasValid"
					error="ctrl.user.aliasErrors[0]"></textbox>

				<textbox
					label="Password"
					on-change="ctrl.checkPasswords"
					control-id="register-password"
					ng-model="ctrl.inputs.password1"
					required="true"
					type="password"
					is-valid="ctrl.user.passwordValue"></textbox>

				<textbox
					label="Confirm password"
					on-change="ctrl.checkPasswords"
					control-id="register-confirm-password"
					ng-model="ctrl.inputs.password2"
					required="true"
					type="password"
					is-valid="ctrl.user.passwordValue"
					error="ctrl.user.passwordErrors[0]"></textbox>

				<div class="${forms.buttonGroup}">
					<busy-button 
						button-disabled="!ctrl.canRegister" 
						busy="ctrl.user.registering">
						<i 
							class="fa fa-paper-plane"
							style="margin-left: -4px">
						</i>
					</busy-button>
				</div>
			</form>
		`,
		bindToController: {
			state: '@'
		}, 
		scope: {}
	};

	return directive;
}

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
'use strict';

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
				<div>
					<div class="${forms.labelContainer}">
						<label for="register-email">Email</label>
					</div>

					<div 
						ng-if="ctrl.user.emailErrors" 
						class="${message.message}">{{ ctrl.user.emailErrors[0] }}
					</div>

					<div class="${forms.inputContainer}">
						<input 
							placeholder="Email" 
							ng-model="ctrl.inputs.email" 
							ng-change="ctrl.checkEmail()" 
							id="register-email" 
							type="email" 
							required="required" />
						
						<input-validity 
							data-busy="ctrl.user.emailValidating"
							data-valid="ctrl.user.emailValid">
						</input-validity>
					</div>
				</div>

				<div>
					<div class="${forms.labelContainer}">
						<label for="register-alias">Alias</label>
					</div>

					<div 
						ng-if="ctrl.user.aliasErrors" 
						class="${message.message}">
						{{ ctrl.user.aliasErrors[0] }}
					</div>

					<div class="${forms.inputContainer}">
						<input 
							placeholder="Alias" 
							ng-change="ctrl.checkAlias()" 
							id="register-alias" 
							type="text" 
							ng-model="ctrl.inputs.alias" 
							required="required" />

						<input-validity 
							data-busy="ctrl.user.aliasValidating"
							data-valid="ctrl.user.aliasValid">
						</input-validity>
					</div>
				</div>

				<div>
					<div class="${forms.labelContainer}">
						<label for="register-password">Password</label>
					</div>

					<div 
						ng-if="ctrl.user.passwordErrors" 
						class="${message.message}">
						{{ ctrl.user.passwordErrors[0] }}
					</div>

					<div class="${forms.inputContainer}">
						<input 
							placeholder="Password" 
							ng-change="ctrl.checkPasswords()" 
							id="register-password" 
							type="password" 
							ng-model="ctrl.inputs.password1" 
							required="required" />

						<input-validity
							data-valid="ctrl.user.passwordValue">
						</input-validity>
					</div>
				</div>

				<div>
					<div class="${forms.labelContainer}">
						<label for="register-confirm-password">Confirm Password</label>
					</div>

					<div class="${forms.inputContainer}">
						<input 
							placeholder="Confirm Password" 
							id="register-confirm-password" 
							type="password" 
							ng-change="ctrl.checkPasswords()" 
							ng-model="ctrl.inputs.password2" 
							required="required" />

						<input-validity
							data-valid="ctrl.user.passwordValue">
						</input-validity>
					</div>
				</div>

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
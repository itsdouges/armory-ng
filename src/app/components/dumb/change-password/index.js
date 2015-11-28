'use strict';

import styles from './change-password.less';
import messageStyles from '../../../styles/message/message.less';
import formStyles from '../../../styles/forms/forms.less';

function component () {
	let directive = {
		restrict: 'E',
		controller: ChangePassword,
		controllerAs: 'ctrl',
		scope: {},
		bindToController: {
			errors: '=',
			changingPassword: '=',
			validatePasswords: '&',
			validPassword: '=',
			changePassword: '&'
		},
		template: `
			<form>
				<div
					ng-if="ctrl.errors" 
					class="${messageStyles.title}"><strong>Uh-oh, pls fix?</strong>
				</div>

				<ul 
					ng-if="ctrl.errors[0]" 
					class="${messageStyles.message} ${messageStyles.error}">
					<li>{{ ctrl.errors[0] }}</li>
				</ul>

				<div class="${formStyles.inputContainer}">
					<input 
						placeholder="Current password" 
						ng-disabled="ctrl.changingPassword" 
						id="p0" 
						type="password"
						ng-model="ctrl.inputs.currentPassword" 
						required="required" />
				</div>

				<div class="${formStyles.inputContainer}">
					<input 
						placeholder="New password" 
						ng-change="ctrl.validatePasswordsDebounce()" 
						ng-disabled="ctrl.changingPassword" 
						id="p1" 
						type="password" 
						ng-model="ctrl.inputs.password1" 
						required="required" />

					<input-validity
						data-valid="ctrl.validPassword">
					</input-validity>
				</div>

				<div class="${formStyles.inputContainer}">
					<input 
						placeholder="Confirm new password" 
						ng-change="ctrl.validatePasswordsDebounce()" 
						ng-disabled="ctrl.changingPassword" 
						id="p2" 
						type="password" 
						ng-model="ctrl.inputs.password2" 
						required="required" />

					<input-validity
						data-valid="ctrl.validPassword">
					</input-validity>
				</div>

				<div class="${formStyles.buttonGroup}">
					<busy-button
						ng-click="ctrl.changePassword({ current: ctrl.inputs.currentPassword , new: ctrl.inputs.password1 })"
						button-disabled="!ctrl.validPassword" 
						busy="ctrl.changingPassword">
						<i class="fa fa-floppy-o"></i>
					</busy-button>
				</div>
			</form>
		`
	};

	return directive;
}

// @ngInject
function ChangePassword (debounce) {
	let scope = this;

	scope.changePassword = scope.changePassword();
	scope.validatePasswords = scope.validatePasswords();

	scope.validatePasswordsDebounce = debounce.func(() => {
		scope.validatePasswords({ password1: scope.inputs.password1, password2: scope.inputs.password2 });
	}, 500);
}

export default component;
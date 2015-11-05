'use strict';

import { actionCreators } from '../../../actions/user';
import userDataActions from '../../../actions/user/data';
import { userDataSelector } from '../../../selectors/user';

import styles from './change-password.less';
import messageStyles from '../../../styles/message/message.less';
import formStyles from '../../../styles/forms/forms.less';

function component () {
	let directive = {
		restrict: 'E',
		controller: ChangePassword,
		controllerAs: 'ctrl',
		scope: {},
		template: `
			<form>
				<div 
					ng-if="ctrl.user.passwordErrors[0]" 
					class="${messageStyles.message}">
					{{ ctrl.user.passwordErrors[0] }}
				</div>

				<div class="${formStyles.inputContainer}">
					<input 
						placeholder="Current password" 
						ng-disabled="ctrl.user.changingPassword" 
						id="add-token" type="password"
						ng-model="ctrl.inputs.currentPassword" 
						required="required" />
				</div>

				<div class="${formStyles.inputContainer}">
					<input 
						placeholder="New password" 
						ng-change="ctrl.checkPasswords()" 
						ng-disabled="ctrl.user.changingPassword" 
						id="add-token" type="password" 
						ng-model="ctrl.inputs.password1" 
						required="required" />

					<input-validity
						data-valid="ctrl.user.passwordValue">
					</input-validity>
				</div>

				<div class="${formStyles.inputContainer}">
					<input 
						placeholder="Confirm new password" 
						ng-change="ctrl.checkPasswords()" 
						ng-disabled="ctrl.user.changingPassword" 
						id="add-token" 
						type="password" 
						ng-model="ctrl.inputs.password2" 
						required="required" />

					<input-validity
						data-valid="ctrl.user.passwordValue">
					</input-validity>
				</div>

				<div class="${formStyles.buttonGroup}">
					<busy-button
						ng-click="ctrl.changePassword()"
						button-disabled="!ctrl.user.passwordValue" 
						busy="ctrl.user.changingPassword">
						<i class="fa fa-floppy-o"></i>
					</busy-button>
				</div>
			</form>
		`
	};

	return directive;
}

// @ngInject
function ChangePassword ($ngRedux, $scope, debounce) {
	let scope = this;

	const unsubscribe = $ngRedux.connect(userDataSelector)(this);
	$scope.$on('$destroy', unsubscribe);

	this.checkPasswords = debounce.func(() => {
		let action = actionCreators.checkPasswords(scope.inputs.password1, scope.inputs.password2);
		$ngRedux.dispatch(action);
	}, 500);

	this.changePassword = () => {
		$ngRedux.dispatch(userDataActions.changePasswordThunk(scope.inputs.currentPassword, scope.inputs.password1));
	};
}

export default component;
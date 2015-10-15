'use strict';

import { actionCreators } from '../../../actions/user';
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
				<div class="${messageStyles.message}">{{ ctrl.user.passwordErrors[0] }}</div>

				<div class="${formStyles.inputContainer}">
					<input placeholder="Current password" ng-disabled="ctrl.busy" id="add-token" type="text" ng-model="ctrl.user.currentPassword" required="required" />

					<input-validity
						data-busy="ctrl.busy"
						data-valid="ctrl.token.valid">
					</input-validity>
				</div>

				<div class="${formStyles.inputContainer}">
					<input placeholder="New password" ng-change="ctrl.checkPasswords()" ng-disabled="ctrl.busy" id="add-token" type="password" ng-model="ctrl.inputs.password1" required="required" />

					<input-validity
						data-busy="ctrl.busy"
						data-valid="ctrl.token.valid">
					</input-validity>
				</div>

				<div class="${formStyles.inputContainer}">
					<input placeholder="Confirm new password" ng-change="ctrl.checkPasswords()" ng-disabled="ctrl.busy" id="add-token" type="password" ng-model="ctrl.inputs.password2" required="required" />

					<input-validity
						data-busy="ctrl.busy"
						data-valid="ctrl.token.valid">
					</input-validity>
				</div>

				<div class="${formStyles.buttonGroup}">
					<busy-button button-disabled="!ctrl.user.validPassword" busy="ctrl.user.savingPassword">
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

	this.savePassword = () => {
		$ngRedux.dispatch(actionCreators.savePasswordThunk(scope.inputs.password1));
	};
}

export default component;
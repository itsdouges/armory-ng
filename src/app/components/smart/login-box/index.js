'use strict';

import { actionCreators } from '../../../actions/user';

import styles from './login-box.less';
import message from '../../../styles/message/message.less';
import forms from '../../../styles/forms/forms.less';

function component () {
	let directive = {
		restrict: 'E',
		controller: LoginBox,
		controllerAs: 'ctrl',
		template: `
			<form ng-submit="ctrl.login()">
				<div class="${message.message}">Don't have an account? <strong><a title="Signup" ui-sref="main.no-auth.with-container.signup">Go signup!</a></strong></div>

				<div>
					<div class="${forms.labelContainer}">
						<label for="email">Email</label>
					</div>

					<div class="${forms.inputContainer}">
						<input placeholder="Email" id="email" type="text" ng-model="ctrl.email" required="required" />
					</div>
				</div>

				<div>
					<div class="${forms.labelContainer}">
						<label for="password">Password</label>
					</div>

					<div class="${forms.inputContainer}">
						<input placeholder="Password" id="password" type="password" ng-model="ctrl.password" required="required" />
					</div>
				</div>

				<div class="${forms.buttonGroup}">
					<busy-button busy="ctrl.fetchingToken">
						<i class="fa fa-sign-in"></i>
					</busy-button>
				</div>
			</form>
		`,
		scope: {}
	};

	return directive;
}

// @ngInject
function LoginBox ($ngRedux, $scope) {
	const unsubscribe = $ngRedux.connect(selector)(this);
	$scope.$on('$destroy', unsubscribe);

	let scope = this;

	this.login = () => {
		$ngRedux.dispatch(actionCreators.fetchTokenThunk(scope.email, scope.password));
	};

	function selector (state) {
		return {
			fetchingToken: state.user.fetchingToken
		};
	};
}

export default component;
import { actionCreators } from '../../../actions/user';
import { userDataSelector } from '../../../selectors/user';
import stateGo from 'redux-ui-router/lib/state-go';

import cardStyles from '../../../styles/cards/cards.less';
import messageStyles from '../../../styles/message/message.less';

function component () {
	return {
		restrict: 'E',
		controller: UserSettingsPage,
		controllerAs: 'ctrl',
		scope: {},
		template: `
        <h2>Api tokens</h2>
        <user-tokens 
        	add-token="ctrl.addToken",
        	remove-token="ctrl.removeToken"
        	validate-token="ctrl.validateToken"
        	valid-token="ctrl.user.validGw2Token"
        	validating-token="ctrl.user.validatingGw2Token"
        	adding-token="ctrl.user.addingGw2Token"
        	tokens="ctrl.user.gw2Tokens"
        	class="${cardStyles.card} ${cardStyles.medium} ${cardStyles.primary}">
      	</user-tokens>

        <h2>Password</h2>
        <change-password
        	errors="ctrl.user.passwordErrors"
        	changing-password="ctrl.user.changingPassword"
        	validate-passwords="ctrl.validatePasswords"
        	change-password="ctrl.changePassword"
        	valid-password="ctrl.user.passwordValue"
        	class="${cardStyles.card} ${cardStyles.medium} ${cardStyles.primary}">
      	</change-password>

	      <div class="${messageStyles.message}">
	      	Ready to leave? <a title="Signout" ng-click="ctrl.logout()" href=""><strong>Signout</strong>.</a>
      	</div>
		`
	};
}

// @ngInject
function UserSettingsPage ($ngRedux, $scope) {
	let that = this;

	function init () {
		const unsubscribe = $ngRedux.connect(userDataSelector)(that);
		$scope.$on('$destroy', unsubscribe);
		$ngRedux.dispatch(actionCreators.fetchGw2TokensThunk());
	}

	that.addToken = (token) => {
		$ngRedux.dispatch(actionCreators.addGw2TokenThunk(token.token));
	};

	that.removeToken = (token) => {
		$ngRedux.dispatch(actionCreators.removeGw2TokenThunk(token.token));
	};

	that.validateToken = (token) => {
		if (that.user.validGw2Token) {
			$ngRedux.dispatch(actionCreators.invalidateGw2Token());
		}

		$ngRedux.dispatch(actionCreators.validateGw2TokenThunk(token.token));
	};

	that.changePassword = (data) => {
		$ngRedux.dispatch(actionCreators.changePasswordThunk(data.current, data.new));
	};

	that.validatePasswords = (data) => {
		let action = actionCreators.checkPasswords(data.password1, data.password2);
		$ngRedux.dispatch(action);
	};

	that.logout = () => {
		$ngRedux.dispatch(actionCreators.clearUserData());
		$ngRedux.dispatch(stateGo('main.no-auth.with-container.login'));
	};

	init();
}

export default component;
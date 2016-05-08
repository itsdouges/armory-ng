import { actionCreators } from '../../../actions/user';
import { userDataSelector } from '../../../selectors/user';
import stateGo from 'redux-ui-router/lib/state-go';

import cardStyles from '../../../styles/cards/cards.less';
import messageStyles from '../../../styles/message/message.less';

function component () {
  return {
    restrict: 'E',
    controller: UserSettingsPage,
    controllerAs: 'settings',
    scope: {},
    template: `
<h2>Api tokens</h2>
<user-tokens
  fetching="settings.user.fetchingTokens"
  add-token="settings.addToken",
  remove-token="settings.removeToken"
  validate-token="settings.validateToken"
  valid-token="settings.user.validGw2Token"
  validating-token="settings.user.validatingGw2Token"
  adding-token="settings.user.addingGw2Token"
  tokens="settings.user.gw2Tokens"
  select-primary-token="settings.selectPrimaryToken"
  class="${cardStyles.card} ${cardStyles.medium} ${cardStyles.primary}">
</user-tokens>

<h2>Password</h2>
<change-password
  errors="settings.user.passwordErrors"
  changing-password="settings.user.changingPassword"
  validate-passwords="settings.validatePasswords"
  change-password="settings.changePassword"
  valid-password="settings.user.passwordValue"
  class="${cardStyles.card} ${cardStyles.medium} ${cardStyles.primary}">
</change-password>

<div class="${messageStyles.message}" style="text-align: center;">
  Ready to leave? <a title="Signout" ng-click="settings.logout()" href=""><strong>Signout</strong>.</a>
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
    $ngRedux.dispatch(actionCreators.checkPasswords(data.password1, data.password2));
  };

  that.logout = () => {
    $ngRedux.dispatch(actionCreators.clearUserData());
    $ngRedux.dispatch(stateGo('main.no-auth.with-container.login'));
  };

  that.selectPrimaryToken = (token) => {
    $ngRedux.dispatch(actionCreators.selectPrimaryTokenThunk(token));
  };

  init();
}

export default component;

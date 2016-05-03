import styles from './user-tokens.less';
import messageStyles from '../../../styles/message/message.less';
import formStyles from '../../../styles/forms/forms.less';
import containerStyles from '../../../styles/container/container.less';

function component () {
  let directive = {
    restrict: 'E',
    controller: UserTokens,
    controllerAs: 'userTokens',
    scope: {},
    bindToController: {
      validateToken: '&',
      fetching: '=',
      validToken: '=',
      validatingToken: '=',
      addingToken: '=',
      addToken: '&',
      removeToken: '&',
      tokens: '=',
      selectPrimaryToken: '&',
    },
    template: `
      <div class="${containerStyles.padding}">
        <div ng-if="!userTokens.tokens.length" class="${messageStyles.message}">
          Oh, you have no api tokens.. <a target="_blank" title="Opens in a new window" href="https://account.arena.net/applications/create"><strong>go generate one <i class="fa fa-external-link"></i></strong></a> ..! Make sure you select characters, builds, and pvp permissions :-).
        </div>

        <gw2-token
          select-primary-token="userTokens.selectPrimaryToken(token.token)"
          remove-token="userTokens.removeToken({ token: token })"
          ng-repeat="token in userTokens.tokens"
          token="token"
          mode="view">
        </gw2-token>
      </div>

      <hr />

      <form class="${formStyles.container}" ng-submit="userTokens.addToken({ token: ctrl.newGw2Token })">
        <textbox
          label="Add gw2 token"
          on-change="userTokens.validateTokenDebounce"
          control-id="add-token"
          ng-model="userTokens.newGw2Token"
          required="true"
          is-busy="userTokens.validatingToken"
          is-valid="userTokens.validToken"
          error="userTokens.tokenError"></textbox>

        <div class="${formStyles.buttonGroup}">
          <busy-button 
            button-disabled="!userTokens.validToken" 
            busy="userTokens.addingToken">
            <i class="fa fa-plus"></i>
          </busy-button>
        </div>
      </form>
    `
  };

  return directive;
}

// @ngInject
function UserTokens (debounce) {
  let that = this;

  // Angular directives passing functions around........ smh..
  that.validateToken = that.validateToken();
  that.addToken = that.addToken();
  that.removeToken = that.removeToken();

  let tokenDebounce;
  that.validateTokenDebounce = () => {
    tokenDebounce = tokenDebounce || debounce.func(() => {
      that.validateToken({ token: that.newGw2Token });
    });

    tokenDebounce();
  };

  this.selectPrimaryToken = (token) => {
    console.log(token);
  };
}

export default component;
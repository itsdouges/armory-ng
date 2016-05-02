import styles from './user-tokens.less';
import messageStyles from '../../../styles/message/message.less';
import formStyles from '../../../styles/forms/forms.less';

function component () {
  let directive = {
    restrict: 'E',
    controller: UserTokens,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: {
      validateToken: '&',
      fetching: '=',
      validToken: '=',
      validatingToken: '=',
      addingToken: '=',
      addToken: '&',
      removeToken: '&',
      tokens: '='
    },
    template: `
      <div class="${messageStyles.message}">
        Need ArenaNet api tokens? <a target="_blank" title="Opens in a new window" href="https://account.arena.net/applications/create"><strong>Go generate one <i class="fa fa-external-link"></i></strong></a>. Make sure you select characters, builds, and pvp permissions :-).
      </div>

      <gw2-token
        remove-token="ctrl.removeToken({ token: token })"
        ng-repeat="token in ctrl.tokens"
        token="token"
        mode="view">
      </gw2-token>

      <form ng-submit="ctrl.addToken({ token: ctrl.newGw2Token })">
        <textbox
          label="Add token"
          on-change="ctrl.validateTokenDebounce"
          control-id="add-token"
          ng-model="ctrl.newGw2Token"
          required="true"
          is-busy="ctrl.validatingToken"
          is-valid="ctrl.validToken"
          error="ctrl.tokenError"></textbox>

        <div class="${formStyles.buttonGroup}">
          <busy-button 
            button-disabled="!ctrl.validToken" 
            busy="ctrl.addingToken">
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
}

export default component;
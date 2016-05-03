import styles from './gw2-token.less';
import colours from '../../../styles/variables/colours.less';

function component () {
  let directive = {
    restrict: 'E',
    controller: Gw2Token,
    controllerAs: 'token',
    scope: {},
    bindToController: {
      token: '=',
      removeToken: '&',
      selectPrimaryToken: '&',
    },
    template: `
      <toggle-button
        ng-click="token.selectPrimaryToken()"
        style="margin: 0.75rem 0.75rem 0.75rem 0;"
        selected="token.primary">
      </toggle-button>

      <div class="${styles.tokenContainer}">
        <div>
          <strong>{{ ::token.token.accountName }}</strong>
          <span ng-if="token.primary"> (primary)</span>
        </div>

        <span class="${styles.permissions}">
          <span>{{ ::token.token.permissions.split(',').join(' | '); }}</span>
        </span>
      </div>

      <a
        title="Remove token"
        class="${styles.delete}"
        ng-click="token.removeToken({ token: token.token.token })"
        href="">
        <i class="fa fa-trash"></i>
      </a>
    `
  };

  return directive;
}

class Gw2Token {}

export default component;
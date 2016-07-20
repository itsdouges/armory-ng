import { actionCreators } from '../../../actions/user';
import { registerSelector } from '../../../selectors/user';
import styles from './register-box.less';
import forms from '../../../styles/forms/forms.less';
import message from '../../../styles/message/message.less';
import debounce from 'app/services/helpers/debounce';

function component () {
  let directive = {
    restrict: 'E',
    controller: RegisterBox,
    controllerAs: 'ctrl',
    template: `
<form class="${forms.container}" ng-submit="ctrl.register()">
  <textbox
    label="Email"
    [on-change]="ctrl.checkEmail"
    [id]="'register-email'"
    [required]="true"
    [busy]="ctrl.user.emailValidating"
    [valid]="ctrl.user.emailValid"
    [error-message]="ctrl.user.emailErrors[0]">
  </textbox>

  <textbox
    label="Alias"
    [on-change]="ctrl.checkAlias"
    [id]="'register-alias'"
    [required]="true"
    [busy]="ctrl.user.aliasValidating"
    [valid]="ctrl.user.aliasValid"
    [error-message]="ctrl.user.aliasErrors[0]">
  </textbox>

  <textbox
    type="password"
    label="Password"
    [on-change]="ctrl.checkPasswords"
    [id]="'register-password'"
    [required]="true"
    [(value)]="ctrl.password"
    [valid]="ctrl.user.passwordValue">
  </textbox>

  <textbox
    type="password"
    label="Confirm password"
    [on-change]="ctrl.checkPasswords"
    [id]="'register-confirm-password'"
    [required]="true"
    [valid]="ctrl.user.passwordValue"
    [(value)]="ctrl.passwordConfirm"
    [error-message]="ctrl.user.passwordErrors[0]">
  </textbox>

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
function RegisterBox ($ngRedux, $scope) {
  const scope = this;

  const unsubscribe = $ngRedux.connect(registerSelector)(this);
  $scope.$on('$destroy', unsubscribe);

  function init () {
    scope.inputs = {};
  }

  this.register = () => {
    $ngRedux.dispatch(actionCreators.registerThunk(scope.user));
  };

  this.checkEmail = debounce((email) => {
    scope.user.emailValid && $ngRedux.dispatch(actionCreators.invalidateEmail());
    email && $ngRedux.dispatch(actionCreators.validateEmailThunk(email));
  });

  this.checkAlias = debounce((alias) => {
    scope.user.aliasValid && $ngRedux.dispatch(actionCreators.invalidateAlias());
    alias && $ngRedux.dispatch(actionCreators.checkAliasThunk(alias));
  });

  this.checkPasswords = debounce(() => {
    $ngRedux.dispatch(actionCreators.checkPasswords(scope.password, scope.passwordConfirm));
  }, 500);

  init();
}

export default component;
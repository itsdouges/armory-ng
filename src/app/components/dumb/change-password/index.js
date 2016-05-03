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
      <form class="${formStyles.container}">
        <textbox
          label="Current password"
          control-id="current-password"
          type="password"
          is-valid="ctrl.validPassword"
          ng-model="ctrl.inputs.currentPassword"
          required="true"></textbox>

        <textbox
          label="New password"
          on-change="ctrl.validatePasswordsDebounce"
          control-id="new-password-one"
          type="password"
          ng-model="ctrl.inputs.password1"
          required="true"
          is-valid="ctrl.validPassword"></textbox>

        <textbox
          label="Confirm password"
          on-change="ctrl.validatePasswordsDebounce"
          control-id="new-password-two"
          type="password"
          ng-model="ctrl.inputs.password2"
          required="true"
          is-valid="ctrl.validPassword"
          error="ctrl.errors[0]"></textbox>

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
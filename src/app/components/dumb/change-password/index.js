import styles from './change-password.less';
import messageStyles from '../../../styles/message/message.less';
import formStyles from '../../../styles/forms/forms.less';
import debounce from 'app/services/helpers/debounce';

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
      <form class="${formStyles.container}" ng-submit="ctrl.changePassword({ current: ctrl.inputs.currentPassword , new: ctrl.inputs.password1 })">
        <textbox
          label="Current password"
          [id]="current-password"
          type="password"
          [valid]="ctrl.validPassword"
          [(value)]="ctrl.inputs.currentPassword"
          [required]="true">
        </textbox>

        <textbox
          label="New password"
          [on-change]="ctrl.validatePasswordsDebounce"
          [id]="new-password-one"
          type="password"
          [(value)]="ctrl.inputs.password1"
          [required]="true"
          [valid]="ctrl.validPassword">
        </textbox>

        <textbox
          label="Confirm password"
          [on-change]="ctrl.validatePasswordsDebounce"
          [id]="new-password-two"
          type="password"
          [(value)]="ctrl.inputs.password2"
          [required]="true"
          [valid]="ctrl.validPassword"
          error="ctrl.errors[0]">
        </textbox>

        <div class="${formStyles.buttonGroup}">
          <busy-button
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
function ChangePassword () {
  const scope = this;

  scope.changePassword = scope.changePassword();
  scope.validatePasswords = scope.validatePasswords();

  scope.validatePasswordsDebounce = debounce(() => {
    scope.validatePasswords({
      password1: scope.inputs.password1,
      password2: scope.inputs.password2,
    });
  }, 500);
}

export default component;

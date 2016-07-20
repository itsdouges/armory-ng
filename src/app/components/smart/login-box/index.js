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
      <form class="${forms.container}" ng-submit="ctrl.login()">
        <div class="${message.message}">
          Don't have an account? <strong><a title="Signup" ui-sref="main.no-auth.with-container.signup">Go signup!</a></strong>
        </div>

        <textbox
          label="Email"
          [id]="'email'"
          [required]="true"
          [(value)]="ctrl.email"
          no-validation="true">
        </textbox>

        <textbox
          type="password"
          label="Password"
          [id]="'password'"
          [(value)]="ctrl.password"
          [required]="true"
          no-validation="true">
        </textbox>

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
import { actionCreators } from '../../../actions/users';
import { usersSelector } from '../../../selectors/users';
import showToast from '../../../actions/toast';
import userActions from '../../../actions/user/data';
import styles from './user-page.less';
import positionStyles from '../../../styles/positioning/positioning.less';

function component () {
  return {
    restrict: 'E',
    scope: {},
    controller: UserDetails,
    controllerAs: 'user',
    bindToController: {
      mode: '@',
    },
    template: `
<div class="${positionStyles.textCenter}">
  <avatar
    ng-if="user.user.alias"
    name="{{ user.user.alias }}"
    image-location="//api.adorable.io/avatars/200/{{ user.user.alias }}.png">
  </avatar>
</div>

<characters-grid
  fetching="user.fetchingCharacters"
  mode="{{ user.mode }}"
  characters="user.user.characters">
</characters-grid>

<pvp-stats stats=""></pvp-stats>

<social-buttons 
  send-toast="user.sendToast"
  location="{{ user.location }}">
</social-buttons>
    `
  };
}

// @ngInject
function UserDetails ($ngRedux, $stateParams, $scope, $location) {
  let that = this;

  function constructor () {
    const unsubscribe = $ngRedux.connect(usersSelector)(state => {    
      switch (that.mode) {
        case 'public':
          that.fetchingCharacters = state.users.fetching;
          that.user = state.users.data[$stateParams.alias];
          that.location = $location.$$absUrl;
          break;

        case 'authenticated':
          that.user = state.me;
          that.fetchingCharacters = state.me.fetching;
          that.location = $location.$$absUrl.replace('me', state.me.alias);
          break;

        default:
          throw 'Mode not handled';
      }
    });

    $scope.$on('$destroy', unsubscribe);

    switch (that.mode) {
      case 'public':
        $ngRedux.dispatch(actionCreators.fetchUserThunk($stateParams.alias));
        break;

      case 'authenticated':
        $ngRedux.dispatch(userActions.fetchMeThunk());
        break;

      default:
        throw 'Mode not handled';
    }
  }

  that.sendToast = (message) => {
    $ngRedux.dispatch(showToast(message));
  }

  constructor();
}

export default component;

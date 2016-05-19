import { actionCreators, fetchPvpStatsThunk, fetchPvpGamesThunk, fetchPvpStandingsThunk } from '../../../actions/users';
import { usersSelector } from '../../../selectors/users';
import showToast from '../../../actions/toast';
import userActions from '../../../actions/user/data';
import styles from './user-page.less';
import positionStyles from '../../../styles/positioning/positioning.less';
import { whoAmI } from '../../../services/who-am-i';

function component () {
  return {
    restrict: 'E',
    scope: {},
    controller: UserDetails,
    controllerAs: 'details',
    bindToController: {
      mode: '@',
    },
    template: `
<div class="${positionStyles.textCenter}">
  <avatar
    ng-if="details.user.alias"
    name="{{ details.user.alias }}"
    image-location="//api.adorable.io/avatars/200/{{ details.user.alias }}.png">
  </avatar>
</div>

<characters-grid
  fetching="details.fetchingCharacters"
  mode="{{ details.mode }}"
  characters="details.user.characters">
</characters-grid>

<pvp-stats stats="details.user.pvpStats"></pvp-stats>

<pvp-standings seasons="details.pvpSeasons" standings="details.user.pvpStandings"></pvp-standings>

<pvp-games games="details.user.pvpGames"></pvp-games>

<br/><br/>

<social-buttons
  location="{{ details.location }}">
</social-buttons>
`
  };
}

// @ngInject
function UserDetails ($ngRedux, $stateParams, $scope, $location, $timeout) {
  const that = this;

  function constructor () {
    const unsubscribe = $ngRedux.connect(usersSelector)(state => {    
      switch (that.mode) {
        case 'public':
          that.fetchingCharacters = state.users.fetching;
          that.user = state.users.data[$stateParams.alias];
          that.location = $location.$$absUrl;
          break;

        case 'authenticated':
          that.user = {
            ...state.me,
            ...state.users.data[whoAmI()],
          };
          that.fetchingCharacters = state.me.fetching;
          that.location = $location.$$absUrl.replace('me', state.me.alias);
          break;

        default:
          throw 'Mode not handled';
      }

      that.pvpSeasons = state.pvpSeasons;
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

    const alias = $stateParams.alias || whoAmI();
    $ngRedux.dispatch(fetchPvpStatsThunk(alias));
    $ngRedux.dispatch(fetchPvpGamesThunk(alias));
    $ngRedux.dispatch(fetchPvpStandingsThunk(alias));
  }

  that.sendToast = (message) => {
    $ngRedux.dispatch(showToast(message));
  }

  constructor();
}

export default component;

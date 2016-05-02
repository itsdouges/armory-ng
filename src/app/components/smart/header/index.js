import { actionCreators } from '../../../actions/user/auth';
import { userDataSelector } from '../../../selectors/user';
import searchActions from '../../../actions/search';
import stateGo from 'redux-ui-router/lib/state-go';

import styles from './header.less';
import positionStyles from  '../../../styles/positioning/positioning.less';
import logoSrc from '../../../../assets/images/gw2-hot-4.png';

function component () {
  let directive = {
    restrict: 'E',
    controller: Header,
    controllerAs: 'header',
    scope: {},
    template:`
      <div class="${styles.brushStroke}"></div>

      <user-links
        search="header.search"
        logged-in="header.user.loggedIn"
        username="{{ header.user.alias }}"></user-links>
    `
  };

  return directive;
}

// @ngInject
function Header ($ngRedux, $scope) {
  let that = this;

  function constructor () {
    const unsubscribe = $ngRedux.connect(userDataSelector)(that);
    $scope.$on('$destroy', unsubscribe);
  }

  function search (term) {
    $ngRedux.dispatch(searchActions.searchThunk(term));
  }

  this.search = search;

  constructor();
}

export default component;
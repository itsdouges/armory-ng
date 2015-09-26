'use strict';

import { actionCreators } from '../../../actions/user/auth';
import { userDataSelector } from '../../../selectors/user';

import stateGo from 'redux-ui-router/lib/state-go';

class HeaderController {
	constructor ($ngRedux, $scope) {
		this.$ngRedux = $ngRedux;

		const unsubscribe = $ngRedux.connect(userDataSelector)(this);
		$scope.$on('$destroy', unsubscribe);
	}

	logout () {
		this.$ngRedux.dispatch(actionCreators.clearUserData());
		this.$ngRedux.dispatch(stateGo('main.no-auth.with-container.login'));
	};
}

export default HeaderController;
'use strict';

import { actionCreators } from '../../actions/user/auth';
import { userDataSelector } from '../../selectors/user';

class UserLinksController {
	constructor ($ngRedux, $scope) {
		this.$ngRedux = $ngRedux;

		const unsubscribe = $ngRedux.connect(userDataSelector)(this);
		$scope.$on('$destroy', unsubscribe);
	}

	logout () {
		this.$ngRedux.dispatch(actionCreators.clearUserData());
	};
}

export default UserLinksController;
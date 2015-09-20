'use strict';

import { actionCreators } from '../../actions/user/auth';
import { userDataSelector } from '../../selectors/user';

function UserLinksController ($ngRedux, $scope) {
	const unsubscribe = $ngRedux.connect(userDataSelector)(this);
	$scope.$on('$destroy', unsubscribe);

	this.logout = () => {
		$ngRedux.dispatch(actionCreators.clearUserData());
	};
}

export default UserLinksController;
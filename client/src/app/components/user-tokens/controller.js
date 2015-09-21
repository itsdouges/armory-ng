'use strict';

import { actionCreators } from '../../actions/user/data';
import { userDataSelector } from '../../selectors/user';

class UserTokensController {
	constructor ($ngRedux, $scope, userService) {
		this.$ngRedux = $ngRedux;

		const unsubscribe = $ngRedux.connect(userDataSelector)(this);
		$scope.$on('$destroy', unsubscribe);

		this.$ngRedux.dispatch(actionCreators.fetchGw2TokensThunk());
	}

	validateToken () {
		this.$ngRedux.dispatch(actionCreators.validateGw2TokenThunk(this.newGw2Token));
	}
}

export default UserTokensController;
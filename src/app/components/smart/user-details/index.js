import { actionCreators } from '../../../actions/users';
import { usersSelector } from '../../../selectors/users';

import userActions from '../../../actions/user/data';

function component () {
	return {
		restrict: 'E',
		scope: {},
		controller: UserDetails,
		controllerAs: 'ctrl',
		bindToController: {
			mode: '@',
		},
		template: `
			<characters-grid 
				mode="{{ ctrl.mode }}"
				characters="ctrl.user.characters"></characters-grid>
		`
	};
}

class UserDetails {
	// @ngInject
	constructor ($ngRedux, $stateParams, $scope) {
		const unsubscribe = $ngRedux.connect(usersSelector)(state => {
			console.log('i was called in user details redux state func');
			
			switch (this.mode) {
				case 'public':
					this.user = state.users.data[$stateParams.alias];
					break;

				case 'authenticated':
					this.user = state.me;
					break;

				default:
					throw 'Mode not handled';
			}
		}.bind(this));

		$scope.$on('$destroy', unsubscribe);

		switch (this.mode) {
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
}

export default component;
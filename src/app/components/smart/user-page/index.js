import { actionCreators } from '../../../actions/users';
import { usersSelector } from '../../../selectors/users';

import showToast from '../../../actions/toast';
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

			<br/>

			<social-buttons 
				send-toast="ctrl.sendToast"
				location="{{ ctrl.location }}"></social-buttons>
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
					that.user = state.users.data[$stateParams.alias];
					that.location = $location.$$absUrl;
					break;

				case 'authenticated':
					that.user = state.me;
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
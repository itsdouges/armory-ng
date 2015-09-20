'use strict';

import { actionCreators } from '../../actions/user/auth'

function AuthService($http, $state, $q, env, $ngRedux) {
	let scope = this;

	this.checkAuthentication = function () {
		console.log('checking auth');

		let state = $ngRedux.getState();
		if (state.user.loggedIn) {
			console.log('ur auth! whalecome!');

			return $q.resolve();
		}

		let token = state.user.token;
		if (token) {
			console.log('u have a token saved, lets check it..');

			return $http.
				get(`${env.api.endpoint}token`, {
					headers: { 
						Authorization: token
					}
				}).then(function () {
					console.log('yeah ur legit');

					$ngRedux.dispatch(actionCreators.authenticateUser());

					return $q.resolve();
			}, function () {
				console.log('bad token, get outta here!');

				$ngRedux.dispatch(actionCreators.clearUserData());

				return $q.reject();
			});
		} else {
			console.log('not auth, get outta here!');

			$ngRedux.dispatch(actionCreators.clearUserData());

			return $q.reject();
		}
	};
}

export default AuthService;
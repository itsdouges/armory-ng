'use strict';

import axios from 'axios';

import { actionCreators } from '../../actions/user/auth'
import { userAuthSelector } from '../../selectors/user';

import stateGo from 'redux-ui-router/lib/state-go';

// TODO: Figure out the best way to hook this into redux.
function AuthService ($state, env, $ngRedux) {
	let scope = this;

	this.checkAuthentication = function () {
		console.log('checking auth');

		let userAuthStatus = userAuthSelector($ngRedux.getState());
		if (userAuthStatus.loggedIn) {
			console.log('ur auth! whalecome!');

			return Promise.resolve();
		}

		if (userAuthStatus.token) {
			console.log('u have a token saved, lets check it..');

			return axios.
				get(`${env.api.endpoint}/users/me`, {
					headers: { 
						Authorization: userAuthStatus.token
					}
				}).then(function (response) {
					console.log('yeah ur legit');

					$ngRedux.dispatch(actionCreators.authenticateUser(response.data));

					return Promise.resolve();
			}, function () {
				console.log('bad token, get outta here!');

				$ngRedux.dispatch(actionCreators.clearUserData());

				return Promise.reject();
			});
		} else {
			console.log('not auth, get outta here!');

			$ngRedux.dispatch(actionCreators.clearUserData());

			return Promise.reject();
		}
	};
}

export default AuthService;
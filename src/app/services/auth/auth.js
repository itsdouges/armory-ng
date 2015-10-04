'use strict';

import axios from 'axios';
import stateGo from 'redux-ui-router/lib/state-go';

import config from '../../../generated/app.env'
import { actionCreators } from '../../actions/user/auth'
import { userAuthSelector } from '../../selectors/user';

// TODO: Figure out the best way to hook this into redux.
class Authentication {
	constructor ($ngRedux) {
		this.$ngRedux = $ngRedux;
	}

	checkAuthentication () {
		console.log('checking auth');

		let userAuthStatus = userAuthSelector(this.$ngRedux.getState());
		if (userAuthStatus.loggedIn) {
			console.log('ur auth! whalecome!');

			return Promise.resolve();
		}

		if (userAuthStatus.token) {
			console.log('u have a token saved, lets check it..');

			return axios.
				get(`${config.api.endpoint}/users/me`, {
					headers: { 
						Authorization: userAuthStatus.token
					}
				}).then((response) => {
					console.log('yeah ur legit');

					this.$ngRedux.dispatch(actionCreators.authenticateUser(response.data));

					return Promise.resolve();
			}.bind(this), (response) => {
				console.log('bad token, get outta here!');

				this.$ngRedux.dispatch(actionCreators.clearUserData());

				return Promise.reject();
			}.bind(this));
		} else {
			console.log('not auth, get outta here!');

			this.$ngRedux.dispatch(actionCreators.clearUserData());

			return Promise.reject();
		}
	}
}

export default Authentication;
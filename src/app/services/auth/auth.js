'use strict';

import axios from 'axios';

import config from '../../app.env'
import { actionCreators } from '../../actions/user/auth'
import { userAuthSelector } from '../../selectors/user';

// TODO: Figure out the best way to hook this into redux.
class Authentication {
	// @ngInject
	constructor ($ngRedux) {
		this.$ngRedux = $ngRedux;
	}

	checkAuthentication () {
		let userAuthStatus = userAuthSelector(this.$ngRedux.getState());
		if (userAuthStatus.loggedIn) {
			return Promise.resolve();
		}

		if (userAuthStatus.token) {
			return axios.
				get(`${config.api.endpoint}/users/me`, {
					headers: { 
						Authorization: userAuthStatus.token
					}
				}).then((response) => {
					this.$ngRedux.dispatch(actionCreators.authenticateUser(response.data));
					return Promise.resolve();
			}.bind(this), (response) => {
				this.$ngRedux.dispatch(actionCreators.clearUserData());
				return Promise.reject();
			}.bind(this));
		} else {
			this.$ngRedux.dispatch(actionCreators.clearUserData());
			return Promise.reject();
		}
	}
}

export default Authentication;
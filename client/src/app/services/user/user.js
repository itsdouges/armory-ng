'use strict';

function UserService ($http, env, $q, authService) {
	function registerSuccess(response) {
		console.log('success registerSuccess');
	}

	function registerFailure(response) {
		if (response.status === 400) {
			return response.data;
		}

		// log + handle
	}

	function handleCheckError(response) {
		console.log('error!');
		return $q.reject(response.data);
	}

	this.register = function (user) {
		this.email = user.email;
		this.password = user.password;

		return $http
			.post(`${env.api.endpoint}users`, user)
			.then(registerSuccess.apply(this), registerFailure);
	};

	this.checkEmail = function (email) {
		return $http
			.get(`${env.api.endpoint}users/check/email/${email}`)
			.then(function (response) {
				return response.data;
			}, handleCheckError);
	};

	this.checkAlias = function (alias) {
		return $http
			.get(`${env.api.endpoint}users/check/alias/${alias}`)
			.then(function (response) {
				return response.data;
			}, handleCheckError);
	};

	this.checkToken = function (token) {
		return $http
			.get(`${env.api.endpoint}users/check/gw2-token/${token}`)
			.then(function (response) {
				return response.data;
			}, handleCheckError);
	};

	/**
	 * Authenticated read user.
	 */
	this.readMe = function () {
		// TODO: TESTME

		return $http
			.get(`${env.api.endpoint}users/me`)
			.then(function (response) {
				return response.data;
			});
	};

	/**
	 * Authenticated list tokens.
	 */
	this.readTokens = function () {
		// TODO: TESTME

		return $http
			.get(`${env.api.endpoint}users/me/gw2-tokens`)
			.then(function (response) {
				return response.data;
			});
	};

	/**
	 * Authenticated add token.
	 */
	this.addToken = function (token) {
		// TODO: TESTME

		return $http
			.post(`${env.api.endpoint}users/me/gw2-tokens`, {
				token: token
			});
	};

	/**
	 * Authenticated remove token.
	 */
	this.deleteToken = function (token) {
		// TODO: TESTME

		return $http
			.delete(`${env.api.endpoint}users/me/gw2-tokens/${token}`);
	};
}

export default UserService;
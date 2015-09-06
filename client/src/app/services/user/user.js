'use strict';

// TODO: Remove auth service
function RegistrationService($http, env, $q) {
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
			.get(`${env.api.endpoint}users/check/token/${token}`)
			.then(function (response) {
				return response.data;
			}, handleCheckError);
	};
}

export default RegistrationService;
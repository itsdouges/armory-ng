'use strict';

function RegistrationService(authService, $http, env) {
	function registerSuccess(response) {
		console.log('success registerSuccess');
		authService.login(this.email, this.password);
	}

	function registerFailure(response) {
		if (response.status === 400) {
			return response.data;
		}
	}

	this.register = function (user) {
		this.email = user.email;
		this.password = user.password;

		var promise = $http
			.post(`${env.api.endpoint}users`, user)
			.then(registerSuccess.apply(this), registerFailure);

		return promise;
	};

	this.checkEmail = function (email) {
		var promise = $http
			.get(`${env.api.endpoint}users/check/email/${email}`)
			.then(function (response) {
				return response.data;
			});

		return promise;
	};

	this.checkAlias = function (alias) {
		var promise = $http
			.get(`${env.api.endpoint}users/check/alias/${alias}`)
			.then(function (response) {
				return response.data;
			});

		return promise;
	};

	this.checkToken = function (token) {
		return $http
			.get(`${env.api.endpoint}users/check/token/${token}`)
			.then(function (response) {
				return response.data;
			});
	};
}

export default RegistrationService;
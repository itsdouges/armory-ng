'use strict';

function RegistrationService(authService, $http) {
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
			.post('https://api.armory.net.au/users', user)
			.then(registerSuccess.apply(this), registerFailure);

		return promise;
	};

	this.checkEmail = function (email) {
		var promise = $http
			.get(`https://api.armory.net.au/availabilities/email/${email}`)
			.then(function (response) {
				return response.data;
			});

		return promise;
	};

	this.checkAlias = function (alias) {
		var promise = $http
			.get(`https://api.armory.net.au/availabilities/alias/${alias}`)
			.then(function (response) {
				return response.data;
			});

		return promise;
	};
}

export default RegistrationService;
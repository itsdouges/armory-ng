'use strict';

let USER_TOKEN_KEY = 'gw2armoryuser_TOKEN';

function AuthService($http, $state, $q) {
	let scope = this;
	let user = {};

	function resetUser() {
		user = {
			authenticated: false
		};

		localStorage.setItem(USER_TOKEN_KEY, '');
	}

	function loginSuccess(response) {
		user.authenticated = true;

		localStorage.setItem(USER_TOKEN_KEY, `${response.data.token_type} ${response.data.access_token}`);

		console.log('success login');

		$state.go('main.with-auth.me');
	}

	this.checkAuthentication = function () {
		console.log('check auth');

		if (user.authenticated) {
			console.log('ur auth');

			var defer = $q.defer();
			defer.resolve();

			return defer.promise;
		}

		let token = localStorage.getItem(USER_TOKEN_KEY);
		if (token) {
			var promise = $http.
				get('https://api.armory.net.au/token', {
					headers: { 
						Authorization: token
					}
				});

			promise.then(function () {
				user.authenticated = true;
			}, function () {
				resetUser();
				$state.go('main.login');
			});

			return promise;
		} else {
			// reject, change state to login

			var defer = $q.defer();
			defer.reject();
			defer.promise.then(null, function() {
				resetUser();
				$state.go('main.login');
			});

			return defer.promise;
		}
	};

	this.isAuthenticated = function () {
		return user.authenticated;
	};

	this.login = function (email, password) {
		$http
			.post('https://api.armory.net.au/token', {
				username: email,
				password: password
			})
			.then(loginSuccess, resetUser);
	};
}

export default AuthService;
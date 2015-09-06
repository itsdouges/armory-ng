'use strict';

let USER_TOKEN_KEY = 'gw2armoryuser_TOKEN';

function AuthService($http, $state, $q, env) {
	let scope = this;
	let user = {};

	function resetUser() {
		console.log('clearing local data');

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

			return $q.resolve();
		}

		let token = localStorage.getItem(USER_TOKEN_KEY);
		if (token) {
			console.log('u have a token saved, lets check it');

			return $http.
				get(`${env.api.endpoint}token`, {
					headers: { 
						Authorization: token
					}
				}).then(function () {
				user.authenticated = true;
			}, function () {
				resetUser();

				return $q.reject();
			});
		} else {
			console.log('ur not auth, lets redirect u to login');
			// reject, change state to login
			// TODO: Is there a better way to do this ?
			// 
			var defer = $q.defer();
			defer.promise.then(null, function() {
				resetUser();
				$state.go('main.login');
			});

			defer.reject();

			return defer.promise;
		}
	};

	this.isAuthenticated = function () {
		return user.authenticated;
	};

	this.login = function (email, password) {
		// TEST PROMISE RETURN
		return $http
			.post(`${env.api.endpoint}token`, {
				username: email,
				password: password,
				grant_type: 'password'
			}, {
				headers: {
					Authorization: 'Basic ' + env.api.token
				}
			})
			.then(loginSuccess, function (response) {
				resetUser();

				// TODO: TEST !

				return $q.reject(response.data.error_description);
			});
	};
}

export default AuthService;
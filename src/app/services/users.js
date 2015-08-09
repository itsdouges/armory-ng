function UsersService($http, $q) {
	this.login = function (email, password) {
		var defer = $q.defer();

		setTimeout(function () {
			defer.resolve({
				token: 'EEAA1321@123',
				email: 'email@email.com',
				alias: 'madou'
			});
		}, 1000);

		return defer.promise;

		// todo: implement meng lol
	};

	this.register = function () {
		var defer = $q.defer();

		setTimeout(function () {
			defer.resolve({
				token: 'EEAA1321@123',
				email: 'email@email.com',
				alias: 'madou'
			});
		}, 1000);

		return defer.promise;
	};

	this.checkEmail = function () {
		var defer = $q.defer();

		setTimeout(function () {
			defer.resolve(true);
		}, 1000);

		return defer.promise;
	};

	this.checkAlias = function () {
		var defer = $q.defer();

		setTimeout(function () {
			defer.resolve(true);
		}, 1000);

		return defer.promise;
	};
}

export default UsersService;
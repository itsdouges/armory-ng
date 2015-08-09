describe('login box', function () {
	var mockUsersService;
	var rootScope;
	var q;

	beforeEach(module('gw2armory'));
	beforeEach(function() {
		mockUsersService = {};
	});

	var systemUnderTest = function (mockControllerBinds) {
		var ctrl;

		inject(function($controller, $rootScope, $q) {
			rootScope = $rootScope;
			q = $q;

			ctrl = $controller('LoginController', {
				usersService: mockUsersService
			});
		});

		return ctrl;
	};

	it ('should not call user service if email and pass arent defined', function () {
		var ctrl = systemUnderTest();
		var loginDefer;

		mockUsersService.login = function () {
			loginDefer = q.defer();
			return loginDefer.promise;
		};

		spyOn(mockUsersService, 'login').and.callThrough();

		ctrl.login();

		rootScope.$apply();

		expect(mockUsersService.login).not.toHaveBeenCalled();
	});

	it ('should call user service if valid', function () {
		var ctrl = systemUnderTest();
		var loginDefer;

		mockUsersService.login = function () {
			loginDefer = q.defer();
			return loginDefer.promise;
		};

		spyOn(mockUsersService, 'login').and.callThrough();

		ctrl.user = {
			email: 'ayy',
			password: 'nahh'
		};

		ctrl.login();

		rootScope.$apply();

		expect(mockUsersService.login).toHaveBeenCalled();
	});

	it ('should set loading when calling login service', function () {
		var ctrl = systemUnderTest();
		var loginDefer;

		mockUsersService.login = function () {
			loginDefer = q.defer();
			return loginDefer.promise;
		};

		spyOn(mockUsersService, 'login').and.callThrough();

		ctrl.user = {
			email: 'ayy',
			password: 'nahh'
		};

		ctrl.login();

		expect(ctrl.loading).toBe(true);
	});

	it ('should redirect to user info on success if user doesnt have valid token', function () {
		var ctrl = systemUnderTest();
		var loginDefer;

		mockUsersService.login = function () {
			loginDefer = q.defer();
			return loginDefer.promise;
		};

		spyOn(mockUsersService, 'login').and.callThrough();

		ctrl.user = {
			email: 'ayy',
			password: 'nahh'
		};

		ctrl.login();

		loginDefer.resolve({
			validToken: false
		});

		rootScope.$apply();

		// figure out implementation when I have the net..
		expect(true).toBe(false);
	});

	it ('should redirect to home on success if user has a valid token', function () {
		var ctrl = systemUnderTest();
		var loginDefer;

		mockUsersService.login = function () {
			loginDefer = q.defer();
			return loginDefer.promise;
		};

		spyOn(mockUsersService, 'login').and.callThrough();

		ctrl.user = {
			email: 'ayy',
			password: 'nahh'
		};

		ctrl.login();

		loginDefer.resolve({
			validToken: true
		});

		rootScope.$apply();

		// figure out implementation when I have the net..
		expect(true).toBe(false);
	});

	it ('should show error message if an error occurred', function () {
		var ctrl = systemUnderTest();
		var loginDefer;

		mockUsersService.login = function () {
			loginDefer = q.defer();
			return loginDefer.promise;
		};

		spyOn(mockUsersService, 'login').and.callThrough();

		ctrl.user = {
			email: 'ayy',
			password: 'nahh'
		};

		ctrl.login();

		var error = 'ahh something bad happened';
		loginDefer.reject(error);

		rootScope.$apply();

		expect(ctrl.error).toBe(error);
	});

	it ('should set loading to false if error occurred', function () {
		var ctrl = systemUnderTest();
		var loginDefer;

		mockUsersService.login = function () {
			loginDefer = q.defer();
			return loginDefer.promise;
		};

		spyOn(mockUsersService, 'login').and.callThrough();

		ctrl.user = {
			email: 'ayy',
			password: 'nahh'
		};

		ctrl.login();

		var error = 'ahh something bad happened';
		loginDefer.reject(error);

		rootScope.$apply();

		expect(ctrl.loading).toBe(false);
	});
});
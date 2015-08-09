describe('register box', function () {
	var mockUsersService;
	var mockGw2ApiService;
	var rootScope;
	var q;

	beforeEach(module('gw2armory'));
	beforeEach(function() {
		mockUsersService = {};
		mockGw2ApiService = {};
	});

	var systemUnderTest = function (mockBinds) {
		var ctrl;

		inject(function($controller, $rootScope, $q) {
			rootScope = $rootScope;
			q = $q;

			ctrl = $controller('RegisterController', {
				usersService: mockUsersService,
				gw2ApiService: mockGw2ApiService
			}, mockBinds);
		});

		return ctrl;
	};

	it ('should not call register service if required values arent passed in', function () {
		var ctrl = systemUnderTest();
		var registerDefer;

		mockUsersService.register = function () {
			registerDefer = q.defer();
			return registerDefer.promise;
		};

		spyOn(mockUsersService, 'register').and.callThrough();

		ctrl.user = {};

		ctrl.sendData();

		expect(mockUsersService.register).not.toHaveBeenCalled();
	});

	it ('should set loading to true and call sendData service', function () {
		var ctrl = systemUnderTest();
		var registerDefer;

		mockUsersService.register = function () {
			registerDefer = q.defer();
			return registerDefer.promise;
		};

		spyOn(mockUsersService, 'register').and.callThrough();

		ctrl.user = {
			emailAvailable: true,
			aliasAvailable: true,
			tokenValid: true,
			passwordsValid: true
		};

		ctrl.sendData();

		expect(mockUsersService.register).toHaveBeenCalled();
		expect(ctrl.loading).toBe(true);
	});

	it ('should return true is passwords are valid', function () {
		var ctrl = systemUnderTest();

		ctrl.user = {
			password1: 'pass',
			password2: 'pass'
		};

		ctrl.checkPasswords();

		expect(ctrl.user.passwordsValid).toBe(true);
	});

	it ('should return false is passwords are invalid', function () {
		var ctrl = systemUnderTest();

		ctrl.user = {
			password1: 'pass',
			password2: 'pas'
		};

		ctrl.checkPasswords();

		expect(ctrl.user.passwordsValid).toBe(false);
	});

	it ('should redirect to home screen on successful sendData', function () {
		var ctrl = systemUnderTest();
		var registerDefer;

		mockUsersService.register = function () {
			registerDefer = q.defer();
			return registerDefer.promise;
		};

		spyOn(mockUsersService, 'register').and.callThrough();

		ctrl.user = {
			emailAvailable: true,
			aliasAvailable: true,
			tokenValid: true,
			password2: 'pass',
			password1: 'pass'
		};

		ctrl.sendData();

		registerDefer.resolve({
			token: 'ayy'
		});

		// todo: implement when i have the internet

		expect(true).toBe(false);
	});

	it('should check email is available and set email loading to true', function () {
		var ctrl = systemUnderTest();
		var emailDefer;

		mockUsersService.checkEmail = function () {
			emailDefer = q.defer();
			return emailDefer.promise;
		};

		spyOn(mockUsersService, 'checkEmail').and.callThrough();

		ctrl.user.email = 'email@email.com';
		ctrl.checkEmail();

		emailDefer.resolve(true);

		expect(mockUsersService.checkEmail).toHaveBeenCalledWith('email@email.com');

		expect(ctrl.emailLoading).toBe(true);
		rootScope.$apply();
		expect(ctrl.emailLoading).toBe(false);
		expect(ctrl.user.emailAvailable).toBe(true);
	});

	it('should check email and return false and set everything as expected', function () {
		var ctrl = systemUnderTest();
		var emailDefer;

		mockUsersService.checkEmail = function () {
			emailDefer = q.defer();
			return emailDefer.promise;
		};

		spyOn(mockUsersService, 'checkEmail').and.callThrough();

		ctrl.user.email = 'email@email.com';
		ctrl.checkEmail();

		emailDefer.resolve(false);

		expect(mockUsersService.checkEmail).toHaveBeenCalledWith('email@email.com');

		expect(ctrl.emailLoading).toBe(true);
		rootScope.$apply();
		expect(ctrl.emailLoading).toBe(false);
		expect(ctrl.user.emailAvailable).toBe(false);
	});

	it('should check email and return an error', function () {
		var ctrl = systemUnderTest();
		var emailDefer;

		mockUsersService.checkEmail = function () {
			emailDefer = q.defer();
			return emailDefer.promise;
		};

		spyOn(mockUsersService, 'checkEmail').and.callThrough();

		ctrl.user.email = 'email@email.com';
		ctrl.checkEmail();

		emailDefer.reject('error occurred');

		expect(mockUsersService.checkEmail).toHaveBeenCalledWith('email@email.com');

		expect(ctrl.emailLoading).toBe(true);
		rootScope.$apply();
		expect(ctrl.emailLoading).toBe(false);
		expect(ctrl.user.emailAvailable).toBe(false);

		expect(ctrl.error).toBe('error occurred');
	});

	it('should set valid token state when token is valid', function () {
		var ctrl = systemUnderTest();
		var emailDefer;

		mockGw2ApiService.checkToken = function () {
			emailDefer = q.defer();
			return emailDefer.promise;
		};

		spyOn(mockGw2ApiService, 'checkToken').and.callThrough();

		ctrl.user.token = '123123TOKENMAN';
		ctrl.checkToken();

		emailDefer.resolve(true);

		expect(mockGw2ApiService.checkToken).toHaveBeenCalledWith('123123TOKENMAN');

		expect(ctrl.tokenLoading).toBe(true);
		rootScope.$apply();
		expect(ctrl.tokenLoading).toBe(false);
		expect(ctrl.user.tokenValid).toBe(true);
	});

	it('should set invalid token state when token wasnt valid', function () {
		var ctrl = systemUnderTest();
		var emailDefer;

		mockGw2ApiService.checkToken = function () {
			emailDefer = q.defer();
			return emailDefer.promise;
		};

		spyOn(mockGw2ApiService, 'checkToken').and.callThrough();

		ctrl.user.token = '123123TOKENMAN';
		ctrl.checkToken();

		emailDefer.resolve(false);

		expect(mockGw2ApiService.checkToken).toHaveBeenCalledWith('123123TOKENMAN');

		expect(ctrl.tokenLoading).toBe(true);
		rootScope.$apply();
		expect(ctrl.tokenLoading).toBe(false);
		expect(ctrl.user.tokenValid).toBe(false);
	});

	it('should set error token state when a error was returned', function () {
		var ctrl = systemUnderTest();
		var emailDefer;

		mockGw2ApiService.checkToken = function () {
			emailDefer = q.defer();
			return emailDefer.promise;
		};

		spyOn(mockGw2ApiService, 'checkToken').and.callThrough();

		ctrl.user.token = '123123TOKENMAN';
		ctrl.checkToken();

		emailDefer.reject('ahh fuk an error lol');

		expect(mockGw2ApiService.checkToken).toHaveBeenCalledWith('123123TOKENMAN');

		expect(ctrl.tokenLoading).toBe(true);
		rootScope.$apply();
		expect(ctrl.tokenLoading).toBe(false);
		expect(ctrl.user.tokenValid).toBe(false);
		expect(ctrl.error).toBe('ahh fuk an error lol');
	});

	it('should set valid alias state when token is valid', function () {
		var ctrl = systemUnderTest();
		var emailDefer;

		mockUsersService.checkAlias = function () {
			emailDefer = q.defer();
			return emailDefer.promise;
		};

		spyOn(mockUsersService, 'checkAlias').and.callThrough();

		ctrl.user.alias = '123123TOKENMAN';
		ctrl.checkAlias();

		emailDefer.resolve(true);

		expect(mockUsersService.checkAlias).toHaveBeenCalledWith('123123TOKENMAN');

		expect(ctrl.aliasLoading).toBe(true);
		rootScope.$apply();
		expect(ctrl.aliasLoading).toBe(false);
		expect(ctrl.user.aliasAvailable).toBe(true);
	});

	it('should set invalid alias state when token wasnt valid', function () {
		var ctrl = systemUnderTest();
		var emailDefer;

		mockUsersService.checkAlias = function () {
			emailDefer = q.defer();
			return emailDefer.promise;
		};

		spyOn(mockUsersService, 'checkAlias').and.callThrough();

		ctrl.user.alias = '123123TOKENMAN';
		ctrl.checkAlias();

		emailDefer.resolve(false);

		expect(mockUsersService.checkAlias).toHaveBeenCalledWith('123123TOKENMAN');

		expect(ctrl.aliasLoading).toBe(true);
		rootScope.$apply();
		expect(ctrl.aliasLoading).toBe(false);
		expect(ctrl.user.aliasAvailable).toBe(false);
	});

	it('should set error alias state when a error was returned', function () {
		var ctrl = systemUnderTest();
		var emailDefer;

		mockUsersService.checkAlias = function () {
			emailDefer = q.defer();
			return emailDefer.promise;
		};

		spyOn(mockUsersService, 'checkAlias').and.callThrough();

		ctrl.user.alias = '123123TOKENMAN';
		ctrl.checkAlias();

		emailDefer.reject('ahh fuk an error lol');

		expect(mockUsersService.checkAlias).toHaveBeenCalledWith('123123TOKENMAN');

		expect(ctrl.aliasLoading).toBe(true);
		rootScope.$apply();
		expect(ctrl.aliasLoading).toBe(false);
		expect(ctrl.user.aliasAvailable).toBe(false);
		expect(ctrl.error).toBe('ahh fuk an error lol');
	});
});
'use strict';

describe('register box', function () {
	var mockRegisterService;
	var mockGw2ApiService;
	var mockState;
	var rootScope;
	var q;

	beforeEach(module('gw2armory'));
	beforeEach(function() {
		mockRegisterService = {};
		mockGw2ApiService = {};
		mockState = {};
	});

	var systemUnderTest = function (mockBinds) {
		var ctrl;

		inject(function($controller, $rootScope, $q) {
			rootScope = $rootScope;
			q = $q;

			var mockDebounce = {
				func: function (func) {
					return function () {
						func.apply(this, arguments);
					};
				}
			}

			ctrl = $controller('RegisterController', {
				registrationService: mockRegisterService,
				gw2Service: mockGw2ApiService,
				$state: mockState,
				debounce: mockDebounce
			}, mockBinds);
		});

		return ctrl;
	};

	it ('should not call register service if required values arent passed in', function () {
		var ctrl = systemUnderTest();
		var registerDefer;

		mockRegisterService.register = function () {
			registerDefer = q.defer();
			return registerDefer.promise;
		};

		spyOn(mockRegisterService, 'register').and.callThrough();

		ctrl.user = {};

		ctrl.sendData();

		expect(mockRegisterService.register).not.toHaveBeenCalled();
	});

	it ('should set loading to true and call sendData service', function () {
		var ctrl = systemUnderTest();
		var registerDefer;

		mockRegisterService.register = function () {
			registerDefer = q.defer();
			return registerDefer.promise;
		};

		spyOn(mockRegisterService, 'register').and.callThrough();

		ctrl.user = {
			emailAvailable: true,
			aliasAvailable: true,
			passwordsValid: true
		};

		ctrl.sendData();

		expect(mockRegisterService.register).toHaveBeenCalled();
		expect(ctrl.loading).toBe(true);
	});

	// todo: write test for error case for register !

	it ('should return true is passwords are valid', function () {
		var ctrl = systemUnderTest();

		ctrl.user = {
			password: 'pass',
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

	it('should check email is available and set email loading to true', function () {
		var ctrl = systemUnderTest();
		var emailDefer;

		mockRegisterService.checkEmail = function () {
			emailDefer = q.defer();
			return emailDefer.promise;
		};

		spyOn(mockRegisterService, 'checkEmail').and.callThrough();

		ctrl.user.email = 'email@email.com';
		ctrl.checkEmail();

		emailDefer.resolve();

		expect(mockRegisterService.checkEmail).toHaveBeenCalledWith('email@email.com');

		expect(ctrl.emailLoading).toBe(true);
		rootScope.$apply();
		expect(ctrl.emailLoading).toBe(false);
		expect(ctrl.user.emailAvailable).toBe(true);
	});

	it('should check email and return false and set everything as expected', function () {
		var ctrl = systemUnderTest();
		var emailDefer;

		mockRegisterService.checkEmail = function () {
			emailDefer = q.defer();
			return emailDefer.promise;
		};

		spyOn(mockRegisterService, 'checkEmail').and.callThrough();

		ctrl.user.email = 'email@email.com';
		ctrl.checkEmail();

		emailDefer.reject();

		expect(mockRegisterService.checkEmail).toHaveBeenCalledWith('email@email.com');

		expect(ctrl.emailLoading).toBe(true);
		rootScope.$apply();
		expect(ctrl.emailLoading).toBe(false);
		expect(ctrl.user.emailAvailable).toBe(false);
	});

	// it('should set valid token state when token is valid', function () {
	// 	var ctrl = systemUnderTest();
	// 	var emailDefer;

	// 	mockGw2ApiService.checkToken = function () {
	// 		emailDefer = q.defer();
	// 		return emailDefer.promise;
	// 	};

	// 	spyOn(mockGw2ApiService, 'checkToken').and.callThrough();

	// 	ctrl.user.token = '123123TOKENMAN';
	// 	ctrl.checkToken();

	// 	emailDefer.resolve();

	// 	expect(mockGw2ApiService.checkToken).toHaveBeenCalledWith('123123TOKENMAN');

	// 	expect(ctrl.tokenLoading).toBe(true);
	// 	rootScope.$apply();
	// 	expect(ctrl.tokenLoading).toBe(false);
	// 	expect(ctrl.user.tokenValid).toBe(true);
	// });

	// it('should set invalid token state when token wasnt valid', function () {
	// 	var ctrl = systemUnderTest();
	// 	var emailDefer;

	// 	mockGw2ApiService.checkToken = function () {
	// 		emailDefer = q.defer();
	// 		return emailDefer.promise;
	// 	};

	// 	spyOn(mockGw2ApiService, 'checkToken').and.callThrough();

	// 	ctrl.user.token = '123123TOKENMAN';
	// 	ctrl.checkToken();

	// 	emailDefer.reject();

	// 	expect(mockGw2ApiService.checkToken).toHaveBeenCalledWith('123123TOKENMAN');

	// 	expect(ctrl.tokenLoading).toBe(true);
	// 	rootScope.$apply();
	// 	expect(ctrl.tokenLoading).toBe(false);
	// 	expect(ctrl.user.tokenValid).toBe(false);
	// });

	it('should set valid alias state when alias is valid', function () {
		var ctrl = systemUnderTest();
		var emailDefer;

		mockRegisterService.checkAlias = function () {
			emailDefer = q.defer();
			return emailDefer.promise;
		};

		spyOn(mockRegisterService, 'checkAlias').and.callThrough();

		ctrl.user.alias = '123123TOKENMAN';
		ctrl.checkAlias();

		emailDefer.resolve();

		expect(mockRegisterService.checkAlias).toHaveBeenCalledWith('123123TOKENMAN');

		expect(ctrl.aliasLoading).toBe(true);
		rootScope.$apply();
		expect(ctrl.aliasLoading).toBe(false);
		expect(ctrl.user.aliasAvailable).toBe(true);
	});

	it('should set invalid alias state when alias wasnt available', function () {
		var ctrl = systemUnderTest();
		var emailDefer;

		mockRegisterService.checkAlias = function () {
			emailDefer = q.defer();
			return emailDefer.promise;
		};

		spyOn(mockRegisterService, 'checkAlias').and.callThrough();

		ctrl.user.alias = '123123TOKENMAN';
		ctrl.checkAlias();

		emailDefer.reject();

		expect(mockRegisterService.checkAlias).toHaveBeenCalledWith('123123TOKENMAN');

		expect(ctrl.aliasLoading).toBe(true);
		rootScope.$apply();
		expect(ctrl.aliasLoading).toBe(false);
		expect(ctrl.user.aliasAvailable).toBe(false);
	});
});
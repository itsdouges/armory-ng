// 'use strict';

// describe('login box', function () {
// 	var mockauthService;
// 	var rootScope;
// 	var mockState;
// 	var q;

// 	beforeEach(module('gw2armory'));
// 	beforeEach(function() {
// 		mockauthService = {};
// 		mockState = {};
// 	});

// 	var systemUnderTest = function (mockControllerBinds) {
// 		var ctrl;

// 		inject(function($controller, $rootScope, $q) {
// 			rootScope = $rootScope;
// 			q = $q;

// 			ctrl = $controller('LoginController', {
// 				authService: mockauthService,
// 				$state: mockState
// 			});
// 		});

// 		return ctrl;
// 	};

// 	it ('should not call user service if email and pass arent defined', function () {
// 		var ctrl = systemUnderTest();
// 		var loginDefer;

// 		mockauthService.login = function () {
// 			loginDefer = q.defer();
// 			return loginDefer.promise;
// 		};

// 		spyOn(mockauthService, 'login').and.callThrough();

// 		ctrl.login();

// 		rootScope.$apply();

// 		expect(mockauthService.login).not.toHaveBeenCalled();
// 	});

// 	it ('should call user service if valid', function () {
// 		var ctrl = systemUnderTest();
// 		var loginDefer;

// 		mockauthService.login = function () {
// 			loginDefer = q.defer();
// 			return loginDefer.promise;
// 		};

// 		spyOn(mockauthService, 'login').and.callThrough();

// 		ctrl.user = {
// 			email: 'ayy',
// 			password: 'nahh'
// 		};

// 		ctrl.login();

// 		rootScope.$apply();

// 		expect(mockauthService.login).toHaveBeenCalled();
// 	});

// 	it ('should set loading when calling login service', function () {
// 		var ctrl = systemUnderTest();
// 		var loginDefer;

// 		mockauthService.login = function () {
// 			loginDefer = q.defer();
// 			return loginDefer.promise;
// 		};

// 		spyOn(mockauthService, 'login').and.callThrough();

// 		ctrl.user = {
// 			email: 'ayy',
// 			password: 'nahh'
// 		};

// 		ctrl.login();

// 		expect(ctrl.loading).toBe(true);
// 	});

// 	it ('should show error message if an error occurred', function () {
// 		var ctrl = systemUnderTest();
// 		var loginDefer;

// 		mockauthService.login = function () {
// 			loginDefer = q.defer();
// 			return loginDefer.promise;
// 		};

// 		spyOn(mockauthService, 'login').and.callThrough();

// 		ctrl.user = {
// 			email: 'ayy',
// 			password: 'nahh'
// 		};

// 		ctrl.login();

// 		var error = 'ahh something bad happened';
// 		loginDefer.reject(error);

// 		rootScope.$apply();

// 		expect(ctrl.error).toBe(error);
// 	});

// 	it ('should set loading to false if error occurred', function () {
// 		var ctrl = systemUnderTest();
// 		var loginDefer;

// 		mockauthService.login = function () {
// 			loginDefer = q.defer();
// 			return loginDefer.promise;
// 		};

// 		spyOn(mockauthService, 'login').and.callThrough();

// 		ctrl.user = {
// 			email: 'ayy',
// 			password: 'nahh'
// 		};

// 		ctrl.login();

// 		var error = 'ahh something bad happened';
// 		loginDefer.reject(error);

// 		rootScope.$apply();

// 		expect(ctrl.loading).toBe(false);
// 	});
// });
'use strict';

var STORAGE_KEY = 'gw2armoryuser_TOKEN';

describe('auth service', function () {
	var mockState;
	var httpBackend;
	var mockUserService;
	var rootScope;
	var systemUnderTest;

	beforeEach(module('gw2armory'));

	beforeEach(function() {
		mockState = {};
		mockState.go = function () {};

		localStorage.setItem(STORAGE_KEY, '');

		module(function ($provide) {
			$provide.value('$state', mockState);
			$provide.value('userService', mockUserService);
		});

		inject(function($rootScope, $httpBackend, authService) {
			rootScope = $rootScope;
			httpBackend = $httpBackend;
			systemUnderTest = authService;
		});
	});

	it ('should call token api during login', function () {
		httpBackend
			.expect('POST', 'https://api.armory.net.au/token', {
				username: 'email',
				password: 'password'
			})
			.respond({
				token: 'Bearer ayyylmao'
			});

		systemUnderTest.login('email', 'password');
	});

	it ('should save token to local storage after successful login', function () {
		httpBackend
			.expect('POST', 'https://api.armory.net.au/token', {
				username: 'email',
				password: 'password'
			})
			.respond({
				token_type: 'Bearer',
				access_token: 'lmao'
			});

		systemUnderTest.login('email', 'password');

		httpBackend.flush();

		expect(localStorage.getItem(STORAGE_KEY)).toBe('Bearer lmao');
	});

	it ('should redirect to me route after successful login', function () {
		spyOn(mockState, 'go');

		httpBackend
			.expect('POST', 'https://api.armory.net.au/token', {
				username: 'email',
				password: 'password'
			})
			.respond({
				token_type: 'Bearer',
				access_token: 'lmao'
			});

		systemUnderTest.login('email', 'password');

		httpBackend.flush();

		expect(mockState.go).toHaveBeenCalledWith('main.with-auth.me');
	});

	it ('should set user to authenticated after successful login', function () {
		mockState.go = function () {};

		httpBackend
			.expect('POST', 'https://api.armory.net.au/token', {
				username: 'email',
				password: 'password'
			})
			.respond({
				token_type: 'Bearer',
				access_token: 'lmao'
			});

		systemUnderTest.login('email', 'password');

		httpBackend.flush();

		expect(systemUnderTest.isAuthenticated()).toBe(true);
	});

	it ('should reset user variable after unsuccessful login', function () {
		httpBackend
			.expect('POST', 'https://api.armory.net.au/token', {
				username: 'email',
				password: 'password'
			})
			.respond(401, {
				error: 'invalid_grant'
			});

		localStorage.setItem(STORAGE_KEY, 'somekey');

		systemUnderTest.login('email', 'password');

		httpBackend.flush();

		expect(localStorage.getItem(STORAGE_KEY)).toBe('');
		expect(systemUnderTest.isAuthenticated()).toBe(false);
	});

	it ('should resolve promise immediately if user is already authenticated', function () {
		httpBackend
			.expect('POST', 'https://api.armory.net.au/token', {
				username: 'email',
				password: 'password'
			})
			.respond({
				token_type: 'Bearer',
				access_token: 'lmao'
			});

		systemUnderTest.login('email', 'password');

		httpBackend.flush();

		expect(systemUnderTest.isAuthenticated()).toBe(true);

		var promiseResolved = false;
		var promise = systemUnderTest.checkAuthentication();
		promise.then(function () {
			promiseResolved = true;
		});

		rootScope.$apply();

		expect(promiseResolved).toBe(true);
	});

	it ('should resolve promise if saved token is valid', function () {
		httpBackend
			.expectGET('https://api.armory.net.au/token', {
				Authorization: 'Bearer Swager',
				Accept: 'application/json, text/plain, */*'
			})
			.respond(200);

		localStorage.setItem(STORAGE_KEY, 'Bearer Swager');
		
		var promiseResolved = false;
		systemUnderTest.checkAuthentication()
			.then(function () {
				promiseResolved = true;
			});

		httpBackend.flush();

		expect(promiseResolved).toBe(true);
	});

	it ('should set authenticated to true if saved token is valid', function () {
		httpBackend
			.expectGET('https://api.armory.net.au/token', {
				Authorization: 'Bearer Swager',
				Accept: 'application/json, text/plain, */*'
			})
			.respond(200);

		localStorage.setItem(STORAGE_KEY, 'Bearer Swager');
		
		systemUnderTest.checkAuthentication();

		httpBackend.flush();

		expect(systemUnderTest.isAuthenticated()).toBe(true);
	});

	it ('should reset user if token is invalid', function () {
		httpBackend
			.expectGET('https://api.armory.net.au/token', {
				Authorization: 'Bearer Swager',
				Accept: 'application/json, text/plain, */*'
			})
			.respond(401);

		localStorage.setItem(STORAGE_KEY, 'Bearer Swager');
		
		systemUnderTest.checkAuthentication();

		httpBackend.flush();

		expect(localStorage.getItem(STORAGE_KEY)).toBe('');
		expect(systemUnderTest.isAuthenticated()).toBe(false);
	});

	it ('should redirect to login page if token is invalid', function () {
		spyOn(mockState, 'go');

		httpBackend
			.expectGET('https://api.armory.net.au/token', {
				Authorization: 'Bearer Swager',
				Accept: 'application/json, text/plain, */*'
			})
			.respond(401);

		localStorage.setItem(STORAGE_KEY, 'Bearer Swager');
		
		systemUnderTest.checkAuthentication();

		httpBackend.flush();

		expect(mockState.go).toHaveBeenCalledWith('main.login');
	});

	it ('should reject promise if token is invalid', function () {
		spyOn(mockState, 'go');

		httpBackend
			.expectGET('https://api.armory.net.au/token', {
				Authorization: 'Bearer Swager',
				Accept: 'application/json, text/plain, */*'
			})
			.respond(401);

		localStorage.setItem(STORAGE_KEY, 'Bearer Swager');
		
		var promiseRejected = false;
		systemUnderTest.checkAuthentication()
			.then(null, function () {
				promiseRejected = true;
			});

		httpBackend.flush();

		expect(promiseRejected).toBe(true);
	});

	it ('should reject promise if user is not authenticated', function () {
		var promiseRejected = false;
		systemUnderTest.checkAuthentication()
			.then(null, function () {
				promiseRejected = true;
			});

		rootScope.$apply();

		expect(promiseRejected).toBe(true);
	});

	it ('should reset user if is not authenticated', function () {
		systemUnderTest.checkAuthentication();

		rootScope.$apply();

		expect(localStorage.getItem(STORAGE_KEY)).toBe('');
		expect(systemUnderTest.isAuthenticated()).toBe(false);
	});

	it ('should redirect to login if is not authenticated', function () {
		spyOn(mockState, 'go');

		systemUnderTest.checkAuthentication();

		rootScope.$apply();

		expect(mockState.go).toHaveBeenCalledWith('main.login');
	});

	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
	});
});
'use strict';

describe('registration service', function () {
	var mockAuthService;
	var httpBackend;
	var rootScope;
	var systemUnderTest;

	beforeEach(module('gw2armory'));

	beforeEach(function() {
		mockAuthService = {};

		module(function ($provide) {
			$provide.value('authService', mockAuthService);
			mockAuthService.login = function () {};
		});

		inject(function($rootScope, $httpBackend, registrationService) {
			rootScope = $rootScope;
			httpBackend = $httpBackend;
			systemUnderTest = registrationService;
		});
	});

	it ('should call check email api', function () {
		httpBackend
			.expectGET('https://api.armory.net.au/availabilities/email/email@email.com')
			.respond(200);

		systemUnderTest.checkEmail('email@email.com');
	});

	it ('should resolve true if email is available', function () {
		httpBackend
			.expectGET('https://api.armory.net.au/availabilities/email/email@email.com')
			.respond(200, true);

		var data;
		systemUnderTest
			.checkEmail('email@email.com')
			.then(function (available) {
				data = available;
			});

		httpBackend.flush();

		expect(data).toBe(true);
	});

	it ('should resolve false if email is not available', function () {
		httpBackend
			.expectGET('https://api.armory.net.au/availabilities/email/email@email.com')
			.respond(200, false);

		var data;
		systemUnderTest
			.checkEmail('email@email.com')
			.then(function (available) {
				data = available;
			});

		httpBackend.flush();

		expect(data).toBe(false);
	});

	it ('should call check alias api', function () {
		httpBackend
			.expectGET('https://api.armory.net.au/availabilities/alias/alias')
			.respond(200);

		systemUnderTest.checkAlias('alias');
	});

	it ('should resolve true if alias is available', function () {
		httpBackend
			.expectGET('https://api.armory.net.au/availabilities/alias/alias')
			.respond(200, true);

		var data;
		systemUnderTest
			.checkAlias('alias')
			.then(function (available) {
				data = available;
			});

		httpBackend.flush();

		expect(data).toBe(true);
	});

	it ('should resolve false if alias is not available', function () {
		httpBackend
			.expectGET('https://api.armory.net.au/availabilities/alias/alias')
			.respond(200, false);

		var data;
		systemUnderTest
			.checkAlias('alias')
			.then(function (available) {
				data = available;
			});

		httpBackend.flush();

		expect(data).toBe(false);
	});

	it ('should call register api with users object', function () {
		var user = {
			email: 'ahh',
			password: 'heheh'
		};

		httpBackend
			.expectPOST('https://api.armory.net.au/users', user)
			.respond(200);

		systemUnderTest.register(user);
	});

	it ('should call login if registration was successful', function () {
		spyOn(mockAuthService, 'login');

		var user = {
			email: 'email1',
			password: 'password1'
		};

		httpBackend
			.expectPOST('https://api.armory.net.au/users', user)
			.respond(200);

		systemUnderTest.register(user);

		httpBackend.flush();

		expect(mockAuthService.login).toHaveBeenCalledWith('email1', 'password1');
	});

	it ('should reject with errors if registration was a bad request', function () {
		spyOn(mockAuthService, 'login');

		var user = {
			email: 'email1',
			password: 'password1'
		};

		var data = {
				errors: [
					'ayy',
					'nahh'
				]
			};

		httpBackend
			.expectPOST('https://api.armory.net.au/users', user)
			.respond(400, data);

		var result;
		systemUnderTest
			.register(user)
			.then(function (errors) {
				result = errors;
			});

		httpBackend.flush();

		expect(result).toEqual(data);
	});

	afterEach(function() {
		httpBackend.verifyNoOutstandingRequest();
		httpBackend.verifyNoOutstandingExpectation();
	});
});
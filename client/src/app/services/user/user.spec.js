'use strict';

describe('user service', function () {
	var httpBackend;
	var rootScope;
	var systemUnderTest;

	beforeEach(module('gw2armory'));

	beforeEach(function() {
		inject(function($rootScope, $httpBackend, userService) {
			rootScope = $rootScope;
			httpBackend = $httpBackend;
			systemUnderTest = userService;
		});
	});

	describe('check', function () {
		describe('email', function () {
			it ('should call check email api', function () {
				httpBackend
					.expectGET('http://192.168.59.103:8082/users/check/email/email@email.com')
					.respond(200);

				systemUnderTest.checkEmail('email@email.com');
			});

			it ('should resolve true if email is available', function () {
				httpBackend
					.expectGET('http://192.168.59.103:8082/users/check/email/email@email.com')
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
					.expectGET('http://192.168.59.103:8082/users/check/email/email@email.com')
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
		});

		describe('alias', function () {
			it ('should call check alias api', function () {
				httpBackend
					.expectGET('http://192.168.59.103:8082/users/check/alias/alias')
					.respond(200);

				systemUnderTest.checkAlias('alias');
			});

			it ('should resolve true if alias is available', function () {
				httpBackend
					.expectGET('http://192.168.59.103:8082/users/check/alias/alias')
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
					.expectGET('http://192.168.59.103:8082/users/check/alias/alias')
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
		});

		describe('token', function () {
			it ('should call check token api', function () {
				httpBackend
					.expectGET('http://192.168.59.103:8082/users/check/gw2-token/a')
					.respond(200);

				systemUnderTest.checkToken('a');
			});

			it ('should resolve true if alias is available', function () {
				httpBackend
					.expectGET('http://192.168.59.103:8082/users/check/gw2-token/b')
					.respond(200, true);

				var data;
				systemUnderTest
					.checkToken('b')
					.then(function (available) {
						data = available;
					});

				httpBackend.flush();

				expect(data).toBe(true);
			});

			it ('should resolve false if alias is not available', function () {
				httpBackend
					.expectGET('http://192.168.59.103:8082/users/check/gw2-token/c')
					.respond(200, false);

				var data;
				systemUnderTest
					.checkToken('c')
					.then(function (available) {
						data = available;
					});

				httpBackend.flush();

				expect(data).toBe(false);
			});
		});
	});

	describe('registration', function () {
		it ('should call register api with users object', function () {
			var user = {
				email: 'ahh',
				password: 'heheh'
			};

			httpBackend
				.expectPOST('http://192.168.59.103:8082/users', user)
				.respond(200);

			systemUnderTest.register(user);
		});

		it ('should reject with errors if registration was a bad request', function () {
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
				.expectPOST('http://192.168.59.103:8082/users', user)
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
	});

	describe('read', function () {
		it ('should call check read api with token', function () {
			httpBackend
				.expectGET('http://192.168.59.103:8082/users/me')
				.respond(200);

			systemUnderTest.readMe();
		});

		it ('should call check read token api with token', function () {
			httpBackend
				.expectGET('http://192.168.59.103:8082/users/me/gw2-tokens')
				.respond(200);

			systemUnderTest.readTokens();
		});
	});

	afterEach(function() {
		httpBackend.verifyNoOutstandingRequest();
		httpBackend.verifyNoOutstandingExpectation();
	});
});
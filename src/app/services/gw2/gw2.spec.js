'use strict';

describe('gw2 api wrapper', function () {
	var httpBackend;
	var http;
	var systemUnderTest;
	var mockEnv;
	var mockGw2ParseService;

	beforeEach(module('gw2armory'));

	beforeEach(function() {
		mockEnv = {
			gw2: {
				endpoint: 'gw2.com/'
			}
		};

		mockGw2ParseService = {};

		module(function ($provide) {
			$provide.constant('env', mockEnv);
			$provide.value('gw2ParseService', mockGw2ParseService);
		});

		inject(function($httpBackend, gw2Service) {
			httpBackend = $httpBackend;
			systemUnderTest = gw2Service;
		});
	});

	it ('should call token api and return success promise', function () {
		httpBackend
			.expectGET('gw2.com/v2/tokeninfo', {
				Authorization: 'Bearer swag',
				Accept: 'application/json, text/plain, */*'
			})
			.respond({
				"id": "ABCDE02B-8888-FEBA-1234-DE98765C7DEF",
				"name": "My API Key",
				"permissions": [
					"account",
					"characters"
				]
			});

		var successPromise = false;
		systemUnderTest
			.checkToken('Bearer swag')
			.then(function () {
				successPromise = true;
			});

		httpBackend.flush();

		expect(successPromise).toBe(true);
	});

	it ('should reject promise if token is invalid', function () {
		httpBackend
			.expectGET('gw2.com/v2/tokeninfo', {
				Authorization: 'Bearer swag',
				Accept: 'application/json, text/plain, */*'
			})
			.respond(403);

		var promiseRejected = false;
		systemUnderTest
			.checkToken('Bearer swag')
			.then(null, function () {
				promiseRejected = true;
			});

		httpBackend.flush();

		expect(promiseRejected).toBe(true);
	});

	it ('should reject promise if token does not have account permissions', function () {
		httpBackend
			.expectGET('gw2.com/v2/tokeninfo', {
				Authorization: 'Bearer swag',
				Accept: 'application/json, text/plain, */*'
			})
			.respond({
				"id": "ABCDE02B-8888-FEBA-1234-DE98765C7DEF",
				"name": "My API Key",
				"permissions": [
					"character"
				]
			});

		var promiseRejected = false;
		systemUnderTest
			.checkToken('Bearer swag')
			.then(null, function () {
				promiseRejected = true;
			});

		httpBackend.flush();

		expect(promiseRejected).toBe(true);
	});

	it ('should reject promise if token does not have character permissions', function () {
		httpBackend
			.expectGET('gw2.com/v2/tokeninfo', {
				Authorization: 'Bearer swag',
				Accept: 'application/json, text/plain, */*'
			})
			.respond({
				"id": "ABCDE02B-8888-FEBA-1234-DE98765C7DEF",
				"name": "My API Key",
				"permissions": [
					"account"
				]
			});

		var promiseRejected = false;
		systemUnderTest
			.checkToken('Bearer swag')
			.then(null, function () {
				promiseRejected = true;
			});

		httpBackend.flush();

		expect(promiseRejected).toBe(true);
	});

	it ('should call skin endpoint and return data', function () {
		var expected = {
			lmao: true
		};

		httpBackend
			.expectGET('gw2.com/v2/skins/123')
			.respond(expected);

		var actual;
		systemUnderTest
			.readSkin('123')
			.then(function (data) {
				actual = data;
			});

		httpBackend.flush();

		expect(expected).toEqual(actual);
	});

	it ('should call item endpoint and parse result', function () {
		mockGw2ParseService.parseItem = function () {};

		var result = {
			ayy: 'lmao'
		};

		spyOn(mockGw2ParseService, 'parseItem').and.returnValue(result);

		var expected = {
			lmao: true
		};

		httpBackend
			.expectGET('gw2.com/v2/items/123')
			.respond(expected);

		var actual;
		systemUnderTest
			.readItem('123')
			.then(function (data) {
				actual = data;
			});

		httpBackend.flush();

		expect(actual).toEqual(result);
		expect(mockGw2ParseService.parseItem).toHaveBeenCalledWith(expected);
	});

	it ('should call items endpoint for multiple items and parse each result item', function () {
		mockGw2ParseService.parseItem = function () {};

		var result = {
			ayy: 'lmao'
		};

		spyOn(mockGw2ParseService, 'parseItem').and.returnValue(result);

		var itemsResponse = [
			{
				id: 1
			}, 
			{
				id: 2
			}
		]

		httpBackend
			.expectGET('gw2.com/v2/items?ids=123,321')
			.respond(itemsResponse);

		var actual;
		systemUnderTest
			.readItems(['123', '321'])
			.then(function (data) {
				actual = data;
			});

		httpBackend.flush();

		expect(mockGw2ParseService.parseItem).toHaveBeenCalledWith(itemsResponse[0]);
		expect(mockGw2ParseService.parseItem).toHaveBeenCalledWith(itemsResponse[1]);
	});

	it ('should call guild endpoint and return data', function () {
		var expected = {
			lmao: true
		};

		httpBackend
			.expectGET('gw2.com/v1/guild_details.json?guild_id=123')
			.respond(expected);

		var actual;
		systemUnderTest
			.readGuild('123')
			.then(function (data) {
				actual = data;
			});

		httpBackend.flush();

		expect(expected).toEqual(actual);
	});

	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
	});
});

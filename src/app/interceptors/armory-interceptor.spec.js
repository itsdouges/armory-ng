'use strict';

describe('armory api interceptor', function () {
	var mockEnv;
	var httpBackend;
	var systemUnderTest;
	var http;

	beforeEach(module('gw2armory'));

	beforeEach(function() {
		mockEnv = {};

		module(function ($provide) {
			$provide.constant('env', mockEnv);
		});

		inject(function($httpBackend, $http) {
			http = $http;
			httpBackend = $httpBackend;
		});
	});

	it ('should add on basic header if calling armory api', function () {
		mockEnv.api = {
			endpoint: 'myapi.com'
		}

		httpBackend
			.expectGET('myapi.com/resource')
			.respond(200);

		var config;
		http.get('myapi.com/resource')
			.then(function (response) {
				config = response.config;
			});

		httpBackend.flush();

		expect(config.headers.Authorization).toBe('Basic');
	});
});
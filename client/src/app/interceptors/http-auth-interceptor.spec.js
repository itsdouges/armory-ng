'use strict';

describe('armory api interceptor', function () {
	var mockEnv;
	var mockState;

	var httpBackend;
	var http;

	beforeEach(module('gw2armory'));

	beforeEach(function() {
		mockEnv = {
			api: {}
		};

		mockState = {
			go: function () {}
		};

		module(function ($provide) {
			$provide.constant('env', mockEnv);
			$provide.value('$state', mockState);
		});

		inject(function($httpBackend, $http) {
			http = $http;
			httpBackend = $httpBackend;
		});
	});

	it ('should redirect to login state if unauthorized response is recieved calling armory api', function () {
		mockEnv.api.endpoint = 'api.com';

		spyOn(mockState, 'go');

		httpBackend
			.expectGET('api.com/not-allowed')
			.respond(401);

		http.get('api.com/not-allowed');

		httpBackend.flush();

		expect(mockState.go).toHaveBeenCalledWith('main.login');
	});

	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
	});
});
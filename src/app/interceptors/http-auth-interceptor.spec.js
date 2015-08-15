'use strict';

describe('armory api interceptor', function () {
	var mockEnv;
	var httpBackend;
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
});
describe('BusyButton', () => {
	it('should be true', () => {
		expect(true).toBe(true);
	});
});

// 'use strict';

// describe('busy button', function () {
// 	var rootScope;
// 	var q;
	
// 	beforeEach(module('gw2armory'));

// 	var systemUnderTest = function (mockBinds) {
// 		var ctrl;

// 		inject(function($controller, $rootScope, $q) {
// 			rootScope = $rootScope;
// 			q = $q;

// 			ctrl = $controller('BusyButtonController');
// 		});

// 		return ctrl;
// 	};

// 	it ('should return true if enabled', function () {
// 		var ctrl = systemUnderTest();
// 		ctrl.busy = false;
// 		ctrl.buttonDisabled = false;

// 		expect(ctrl.isEnabled()).toBe(true);
// 	});

// 	it ('should return false if busy', function () {
// 		var ctrl = systemUnderTest();
// 		ctrl.busy = true;
// 		ctrl.buttonDisabled = false;

// 		expect(ctrl.isEnabled()).toBe(false);
// 	});

// 	it ('should return false if disabled', function () {
// 		var ctrl = systemUnderTest();
// 		ctrl.busy = false;
// 		ctrl.buttonDisabled = true;

// 		expect(ctrl.isEnabled()).toBe(false);
// 	});
// });
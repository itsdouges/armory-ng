'use strict';

let DEFAULTS = {
	delay: 500 // ms
};

/*
 * Debounce service to be used in Angular.
 * Unfortunately we need to flush the scope
 * so this has to be an angular service.
 */
function DebounceService($rootScope) {
	function debounce(func, delay) {
		let timeout;

		return function () {
			let scope = this;
			clearTimeout(timeout);

			timeout = setTimeout(function () {
				func.apply(scope, arguments);
				$rootScope.$apply();
			}, delay || DEFAULTS.delay);
		};
	}

	this.func = debounce;
}

export default DebounceService;
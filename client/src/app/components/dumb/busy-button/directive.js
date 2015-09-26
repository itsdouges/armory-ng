'use strict';

function BusyButtonDirective() {
	let directive = {
		restrict: 'E',
		bindToController: {
			busy: '=',
			buttonDisabled: '='
		},
		controller: 'BusyButtonController as ctrl',
		templateUrl: 'app/components/dumb/busy-button/view.html',
		scope: {},
		transclude: true
	};

	return directive;
}

export default BusyButtonDirective;
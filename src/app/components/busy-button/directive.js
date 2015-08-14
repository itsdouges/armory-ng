'use strict';

function BusyButtonDirective() {
	let directive = {
		restrict: 'E',
		bindToController: {
			busy: '=',
			buttonDisabled: '='
		},
		controller: 'BusyButtonController as ctrl',
		templateUrl: 'app/components/busy-button/view.html',
		scope: {},
		transclude: true
	};

	return directive;
}

export default BusyButtonDirective;
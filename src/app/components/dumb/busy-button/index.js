'use strict';

function component () {
	let directive = {
		restrict: 'E',
		bindToController: {
			busy: '=',
			buttonDisabled: '='
		},
		controller: BusyButton,
		controllerAs: 'ctrl',
		templateUrl: 'app/components/dumb/busy-button/view.html',
		scope: {},
		transclude: true
	};

	return directive;
}

export class BusyButton {

}

export default component;
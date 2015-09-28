'use strict';

function BusyButtonDirective() {
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
	constructor () {
		this.isEnabled = function () {
			let enabled = !this.busy && !this.buttonDisabled;
			return enabled;
		}.bind(this);
	}
}

export default BusyButtonDirective;
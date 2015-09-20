'use strict';

function BusyButtonController() {
	var scope = this;

	this.isEnabled = function () {
		let enabled = !scope.busy && !scope.buttonDisabled;
		return enabled;
	}
}

export default BusyButtonController;
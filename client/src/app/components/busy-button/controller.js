'use strict';

function BusyButtonController() {
	var scope = this;

	this.isEnabled = function () {
		let enabled = !scope.busy && !scope.buttonDisabled;
		console.log(`busy button enabled: ${enabled}`);
		
		return enabled;
	}
}

export default BusyButtonController;
function BusyButtonController() {
	var scope = this;

	this.isEnabled = function () {
		return !scope.busy && !scope.buttonDisabled;
	}
}

export default BusyButtonController;
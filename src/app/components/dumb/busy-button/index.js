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
		template: require('./view.html'),
		scope: {},
		transclude: true
	};

	return directive;
}

export class BusyButton {

}

export default component;
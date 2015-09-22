'use strict';

function UpgradeComponentDirective() {
	'ngInject';

	let directive = {
		restrict: 'E',
		templateUrl: 'app/components/dumb/upgrade-component/view.html',
		controller: 'UpgradeComponentController as ctrl',
		scope: {},
		bindToController: {
			upgrade: '='
		}
	};

	return directive;
}

export default UpgradeComponentDirective;
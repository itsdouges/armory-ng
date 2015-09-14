'use strict';

function ProgressIndicatorDirective() {
	let directive = {
		restrict: 'E',
		controller: 'ProgressIndicatorController as ctrl',
		templateUrl: 'app/components/progress-indicator/view.html',
		scope: {},
		bindToController: {
			'busy': '=',
			'size': '@'
		}
	};

	return directive;
}

export default ProgressIndicatorDirective;
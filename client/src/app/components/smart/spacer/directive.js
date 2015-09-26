'use strict';

function Spacer () {
	let directive = {
		restrict: 'E',
		scope: {},
		controller: 'SpacerController as ctrl',
		templateUrl: 'app/components/smart/spacer/view.html'
	};

	return directive;
}

export default Spacer;
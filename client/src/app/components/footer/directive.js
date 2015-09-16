'use strict';

function FooterDirective() {
	let link = (scope, element, attributes) => {
		// todo: watch footer child height change, set ctrl value appropriately
	};

	let directive = {
		restrict: 'E',
		controller: 'FooterController as ctrl',
		templateUrl: 'app/components/footer/view.html'
	};

	return directive;
}

export default FooterDirective;
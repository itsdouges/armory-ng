'use strict';

function RegisterDirective() {
	let directive = {
		restrict: 'E',
		controller: 'RegisterController as ctrl',
		templateUrl: 'app/components/register-box/view.html',
		bindToController: {
			state: '@'
		}, 
		scope: {}
	};

	return directive;
}

export default RegisterDirective;
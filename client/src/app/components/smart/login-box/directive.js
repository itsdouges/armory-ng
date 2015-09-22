'use strict';

function LoginDirective() {
	let directive = {
		restrict: 'E',
		controller: 'LoginController as ctrl',
		templateUrl: 'app/components/smart/login-box/view.html',
		scope: {}
	};

	return directive;
}

export default LoginDirective;
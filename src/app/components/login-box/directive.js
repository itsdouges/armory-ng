function LoginDirective() {
	let directive = {
		restrict: 'E',
		controller: 'LoginController as ctrl',
		templateUrl: 'app/components/login-box/view.html',
		scope: {}
	};

	return directive;
}

export default LoginDirective;
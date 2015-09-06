'use strict';

function UserTokensController (userService, $scope) {
	var scope = this;

	function init () {
		scope.tokens = [];

		userService
			.readTokens()
			.then((tokens) => {
				scope.tokens = tokens || scope.tokens;
				console.log(scope.tokens);
			});
	}

	$scope.$on('token-added', (token) => {
		scope.tokens.push(token);
	});

	$scope.$on('token-deleted', (token) => {
		var index = scope.tokens.indexOf(token);
		scope.tokens.splice(index, 1);
	});

	init();
}

export default UserTokensController;
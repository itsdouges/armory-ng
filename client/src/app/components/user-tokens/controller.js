'use strict';

function UserTokensController (userService) {
	var scope = this;

	function init () {
		scope.tokens = [];

		userService
			.readTokens(function (tokens) {
				console.log(tokens);

				scope.tokens = tokens || scope.tokens;
			});
	}

	init();
}

export default UserTokensController;
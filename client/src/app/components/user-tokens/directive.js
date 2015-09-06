'use strict';

function UserTokensDirective () {
	let directive = {
		restrict: 'E',
		controller: 'UserTokensController as ctrl',
		scope: {},
		templateUrl: 'app/components/user-tokens/view.html',
	};

	return directive;
}

export default UserTokensDirective;
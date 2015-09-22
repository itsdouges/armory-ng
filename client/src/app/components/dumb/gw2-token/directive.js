'use strict';

function Gw2TokenDirective () {
	let directive = {
		restrict: 'E',
		controller: 'Gw2TokenController as ctrl',
		scope: {},
		bindToController: {
			token: '=',
			removeToken: '&'
		},
		require: '^userTokens',
		templateUrl: 'app/components/dumb/gw2-token/view.html',
	};

	return directive;
}

export default Gw2TokenDirective;
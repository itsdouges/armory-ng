'use strict';

function GuildBlockDirective() {
	let directive = {
		restrict: 'E',
		controller: 'GuildBlockController as ctrl',
		templateUrl: 'app/components/dumb/guild-block/view.html',
		scope: {},
		bindToController: {
			guid: '@'
		}
	};

	return directive;
}

export default GuildBlockDirective;
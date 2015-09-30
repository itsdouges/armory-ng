'use strict';

function component () {
	let directive = {
		restrict: 'E',
		controller: GuildBlock,
		controllerAs: 'ctrl',
		templateUrl: 'app/components/dumb/guild-block/view.html',
		scope: {},
		bindToController: {
			guid: '@'
		}
	};

	return directive;
}

// TODO: Move logic into higher component
class GuildBlock {
	constructor (gw2Service) {
		this.busy = true;
		this.loadGuild();
	}

	success (guild) {
		this.guild = guild;

		this.busy = false;
		this.loaded = true;
	}

	failure (e) {
		this.busy = false;
		this.error = true;
		this.guild = null;
	}

	loadGuild () {
		this.busy = true;
		this.loaded = false;
		this.error = false;

		if (this.guid) {
			gw2Service.readGuild(this.guid)
				.then(this.success, this.failure);
		} else {
			this.failure();
		}
	}

	isBusy () {
		return this.busy;
	}

	isLoaded () {
		return this.loaded;
	}
}

export default component;
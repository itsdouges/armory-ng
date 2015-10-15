'use strict';

function component () {
	let directive = {
		restrict: 'E',
		controller: GuildBlock,
		controllerAs: 'ctrl',
		template: `
			<div class="guild-block">
				<a ng-if="ctrl.isLoaded()" title="Guild pages coming soon" href="#" class="guild-link">
					<span class="guild-icon">
						<img ng-src="http://guilds.gw2w2w.com/guilds/{{ ctrl.guild.guild_name }}/100.svg" />
					</span>
					<span class="guild-name">{{ ctrl.guild.guild_name }} [{{ ctrl.guild.tag }}]</span>
				</a>

				<span ng-if="ctrl.isBusy()" class="progress-indicator animating"></span>
			</div>
		`,
		scope: {},
		bindToController: {
			guid: '@'
		}
	};

	return directive;
}

// TODO: Move logic into higher component
class GuildBlock {
	/*@ngInject*/
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
// TODO: Test a bit lolz
// TODO: Replace dependency on gw2w2w

function GuildBlockController(gw2ApiService) {
	/* ngInject */

	let vm = this;
	let _busy;
	let _loaded;

	function init() {
		vm.busy = true;

		loadGuild();
	}

	function success(guild) {
		vm.guild = guild;

		_busy = false;
		_loaded = true;
	}

	function failure(e) {
		_busy = false;
		vm.error = true;
		vm.guild = null;
	}

	function loadGuild() {
		_busy = true;
		_loaded = false;
		vm.error = false;

		if (vm.guid) {
			gw2ApiService.readGuild(vm.guid)
				.then(success, failure);
			} else {
				failure();
			}
	}

	function isBusy() {
		return _busy;
	}

	function isLoaded() {
		return _loaded;
	}

	init();

	vm.isBusy = isBusy;
	vm.isLoaded = isLoaded;
}

export default GuildBlockController;
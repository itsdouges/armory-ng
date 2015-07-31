/**
 * CharacterViewerController
 */
function ItemController(gw2ApiService) {
	'ngInject';

	let _gw2ApiService;

	let _item;
	let _busy;
	let _loaded;
	let _tooltipVisible;
	let _typeBackground;

	function init() {
		_gw2ApiService = gw2ApiService;
		_tooltipVisible = false;
		_typeBackground = buildTypeBackgroundUrl(this.type);

		loadItem(this.id);	
	}

	function buildTypeBackgroundUrl(type) {
		switch(type) {

		}

		return '../assets/images/item-default-icon.png';
	}

	function readSuccess(item) {
		vm.item = item;
		_busy = false;
		_loaded = true;
	};

	function readFailure() {
		vm.item = null;
		_busy = false;
	};

	function loadItem(id) {
		_busy = true;
		_loaded = false;

		if (id) {
			_gw2ApiService
				.readItem(id)
				.then(readSuccess, readFailure);
		} else {
			_busy = false;
		}
	}

	function isBusy() {
		return _busy;
	}

	function isLoaded() {
		return _loaded;
	}

	function setTootipVisibility(visible) {
		_tooltipVisible	= visible;
	}

	function getTootipVisibility() {
		return _tooltipVisible;
	}

	init.call(this);

	let vm = {
		getTootipVisibility,
		setTootipVisibility,
		item: {},
		typeBackground: _typeBackground,
		isLoaded,
		isBusy,
		loadItem
	};

	return vm;
}

export default ItemController;
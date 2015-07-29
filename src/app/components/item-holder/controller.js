let _item;
let _busy;
let _loaded;
let _gw2ApiService;
let _tooltipVisible;

let readSuccess = function(item) {
	_item = item;
	_busy = false;
	_loaded = true;
};

let readFailure = function(errorMessage) {
	_item = null;
	_busy = false;
};

/**
 * CharacterViewerController
 */
class ItemController {
	constructor(gw2ApiService) {
		'ngInject';

		_gw2ApiService = gw2ApiService;
		_tooltipVisible = false;

		this.loadItem(this.id);	
	}

	loadItem(id) {
		_busy = true;
		_loaded = false;

		_gw2ApiService
			.readItem(id)
			.then(readSuccess, readFailure);
	}

	isBusy() {
		return _busy;
	}

	isLoaded() {
		return _loaded;
	}

	getItem() {
		return _item;
	}

	getIconUrl() {
		return _gw2ApiService.buildRenderUrl(_item.icon_file_id, _item.icon_file_signature);
	}

	setTootipVisibility(visible) {
		_tooltipVisible	= visible;
	}

	getTootipVisibility() {
		return _tooltipVisible;
	}
}

export default ItemController;
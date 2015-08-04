// todo: cross browser implementation, something breaks in AT LEAST I.E.

/**
 * CharacterViewerController
 */
function ItemController(gw2ApiService) {
	'ngInject';

	let _item;
	let _busy;
	let _loaded;
	let _tooltipVisible;
	let _typeBackground;
	let vm = this;

	function init() {
		_tooltipVisible = false;
		_typeBackground = buildTypeBackgroundUrl(this.type);

		if (!this.item) {
			return;
		}

		if (this.item.skin) {
			loadIcon(this.item.skin, true)
		} else if (this.item.id) {
			loadIcon(this.item.id, false);
		} 
	}

	function buildTypeBackgroundUrl(type) {
		if (type) {
			return `../assets/images/${type}-slot-icon.png`;
		}

		return '../assets/images/item-default-icon.png';
	}

	function readSuccess(item) {
		vm.iconUrl = item.icon;

		_busy = false;
		_loaded = true;
	};

	function readFailure() {
		vm.iconUrl = null;
		_busy = false;
	};

	function loadIcon(id, loadFromSkin) {
		_busy = true;
		_loaded = false;

		loadFromSkin ? 
			gw2ApiService
				.readSkin(id)
				.then(readSuccess, readFailure) :
			gw2ApiService
				.readItem(id)
				.then(readSuccess, readFailure);
	}

	function isBusy() {
		return _busy;
	}

	function isLoaded() {
		return _loaded;
	}

	function setTootipVisibility(visible) {
		if (_tooltipVisible != visible) {
			_tooltipVisible	= visible;
		}
	}

	function getTootipVisibility() {
		return _tooltipVisible;
	}

	init.call(this);

	vm.getTootipVisibility = getTootipVisibility;
	vm.setTootipVisibility = setTootipVisibility;
	vm.typeBackground = _typeBackground;
	vm.isLoaded = isLoaded;
	vm.isBusy = isBusy;
}

export default ItemController;
'use strict';

function ItemController() {
	this.typeBackground = buildTypeBackgroundUrl(this.type);

	function buildTypeBackgroundUrl(type) {
		if (type) {
			return `../assets/images/${type}-slot-icon.png`;
		}

		return '../assets/images/item-default-icon.png';
	}
}

export default ItemController;
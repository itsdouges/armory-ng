'use strict';

import styles from './item-block.less';

function component () {
	let directive = {
		restrict: 'E',
		template: `
			<div 
				ng-mouseenter="ctrl.showTooltip({ show: true, item: ctrl.item.id, skin: ctrl.item.skin, upgrades: ctrl.item.upgrades, type: ctrl.slotName, upgradeCount: ctrl.item.counts.total })"
				ng-mouseleave="ctrl.showTooltip({ show: false })"
				class="${styles.container} ${styles.containerDefault} {{ ctrl.typeBackground(ctrl.type) }}"
				ng-class="{ ${styles.fetching} : ctrl.fetching }">

				<div class="${styles.item}" style="background-image: url('{{ ctrl.icon }}')">
				</div>
			</div>
		`,
		controller: ItemBlock,
		controllerAs: 'ctrl',
		scope: {},
		bindToController: {
			item: '=',
			slotName: '@',
			type: '@',
			icon: '@',
			fetching: '=',
			showTooltip: '&'
		}
	};

	return directive;
}

class ItemBlock {
	typeBackground (type) {
		return styles[`${type}Icon`];
	}
}

export default component;
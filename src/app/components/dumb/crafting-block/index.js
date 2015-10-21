'use strict';

import styles from './crafting-block.less';

function component () {
	let directive = {
		restrict: 'E',
		template: `
			<div title="{{ ctrl.model.discipline }} {{ ctrl.isActive() ? '(active)' : '' }}" class="${styles.container}" ng-class="ctrl.mode.active ? '${styles.active}' : ''">
				<span class="${styles.icon}" ng-class="ctrl.getDisciplineCssClass(ctrl.model.discipline)"></span>
				<span class="${styles.ratingBlock}" ng-style="ctrl.style"></span>
				<span class="${styles.rating}">
					{{ ctrl.model.rating }}/{{ ctrl.total }}
				</span>	
			</div>
			`,
		controller: CraftingBlock,
		controllerAs: 'ctrl',
		scope: {},
		bindToController: {
			model: '='
		}
	};

	return directive;
}

class CraftingBlock {
	constructor () {
		if (this.model.discipline === 'Chef' || 
			this.model.discipline === 'Jeweler') {
			this.total = 400;
		} else {
			this.total = 500;
		}

		this.style = {
			width: this.calcWidthPercent(this.model.rating, this.total)
		};
	}

	getDisciplineCssClass (discipline) {
		return styles[discipline.toLowerCase()];
	}

	calcWidthPercent (rating, total) {
		let percent = Math.ceil((rating / total || 0) * 100);
		return `${percent}%`;
	}
}

export default component;
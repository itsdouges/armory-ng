'use strict';

import styles from './character-portrait.less';

function component () {
	let directive = {
		restrict: 'E',
		scope: {},
		controller: CharacterPortrait,
		controllerAs: 'ctrl',
		template: `
			<div 
				class="${styles.portrait} ${styles.portraitBgDefault}"
				ng-class="ctrl.getRaceCssClass(ctrl.character.race)">
				<div class="${styles.portraitTopIn} ${styles.borderStrip1}"></div>
				<div class="${styles.portraitBottomIn} ${styles.borderStrip2}"></div>
			</div>
		`,
		bindToController: {
			character: '='
		}
	};

	return directive;
}

class CharacterPortrait {
	getRaceCssClass (race) {
		return styles[race.toLowerCase()];
	}
}

export default component;
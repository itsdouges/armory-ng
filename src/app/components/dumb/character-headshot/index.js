'use strict';

import styles from './character-headshot.less';

function component () {
	let directive = {
		restrict: 'E',
		scope: {},
		bindToController: {
			character: '='
		},
		controller: CharacterHeadshot,
		controllerAs: 'ctrl',
		template: `
			<div
				class="${styles.image}"
				ng-class="ctrl.professionToClass(ctrl.character.profession)"></div>
				
			<div class="${styles.info}">
				<div class="${styles.name}">
					{{ ctrl.character.name }}
				</div>

				<div class="${styles.profession}">
					{{ ctrl.character.level }}
					{{ ctrl.character.race }}
					{{ ctrl.character.profession }}
				</div>
				
				<div class="${styles.accountName}">
					{{ ctrl.character.accountName }}
				</div>
			</div>
		`
	};

	return directive;
}

class CharacterHeadshot {
	professionToClass (profession) {
		return styles[profession.toLowerCase()];
	}
}

export default component;
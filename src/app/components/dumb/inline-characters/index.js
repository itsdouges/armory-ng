'use strict';

import styles from './inline-characters.less';

function component () {
	let directive = {
		restrict: 'E',
		controller: InlineCharacters,
		controllerAs: 'ctrl',
		scope: {},
		bindToController: {
			characters: '='
		},
		template: `
			<ul>
				<li
					class="${styles.item}" 
					ng-repeat="character in ctrl.characters track by $index">
					<a
						ng-href="#!/me/characters/{{ character.name }}"
						ng-class="character.profession.toLowerCase()">
						<character-headshot character="character"></character-headshot>
					</a>
				</li>
			</ul>
		`,
	};

	return directive;
}

function InlineCharacters () {

}

export default component;
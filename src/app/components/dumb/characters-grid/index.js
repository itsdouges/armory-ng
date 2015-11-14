import styles from './characters-grid.less';
import sliderStyles from '../../smart/characters-slider/characters-slider.less';

// TODO: Split border strokes into dumb component

function component () {
	let directive = {
		restrict: 'E',
		controller: CharactersGrid,
		controllerAs: 'ctrl',
		scope: {},
		bindToController: {
			characters: '=',
			columns: '=',
			fetching: '=',
			mode: '@',
			displayMode: '@'
		},
		template: `
			<div class="${sliderStyles.borderContainer} ${sliderStyles.borderContainerTop}">
				<div class="${sliderStyles.border} ${sliderStyles.borderTopLeft}"></div>
				<div class="${sliderStyles.border} ${sliderStyles.borderTopRight}"></div>
			</div>

			<div 
				class="${styles.container}"
				ng-class="ctrl.displayMode === 'slider' ? '${styles.slider}' : '${styles.grid}'">
				<div 
					class="${styles.sliderMessage}" 
					ng-if="!ctrl.fetching && !ctrl.hasCharacters()">
					<span ng-if="ctrl.mode === 'public'">Oh, he has no characters.. :(</span>
					<span ng-if="ctrl.mode === 'authenticated'">Oh, you have no characters.. why not <a ui-sref="main.with-auth.with-container.settings"><strong>add a few api tokens</strong></a> to your account?</span>
				</div>

				<progress-indicator
					class="${styles.progress}"
					busy="ctrl.fetching"></progress-indicator>

				<inline-characters
					mode="{{ ctrl.mode }}"
					characters="ctrl.characters"></inline-characters>
			</div>

			<div class="${sliderStyles.borderContainer} ${sliderStyles.borderContainerBottom}">
				<div class="${sliderStyles.border} ${sliderStyles.borderBottomLeft}"></div>
				<div class="${sliderStyles.border} ${sliderStyles.borderBottomRight}"></div>
			</div>
		`
	};

	return directive;
}

// @ngInject
function CharactersGrid ($element, $scope) {
	let that = this;

	that.hasCharacters = () => {
		return that.characters && that.characters.length;
	}
}

export default component;
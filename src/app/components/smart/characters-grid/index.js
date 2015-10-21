import { actionCreators } from '../../../actions/user/characters';
import { myCharactersSelector } from '../../../selectors/characters';

import styles from './characters-grid.less';
import sliderStyles from '../characters-slider/characters-slider.less';

function component () {
	let directive = {
		restrict: 'E',
		controller: CharactersGrid,
		controllerAs: 'ctrl',
		scope: {},
		template: `
			<!-- TODO: Make these into dumb components -->
			<div class="${sliderStyles.borderContainer} ${sliderStyles.borderContainerTop}">
				<div class="${sliderStyles.border} ${sliderStyles.borderTopLeft}"></div>
				<div class="${sliderStyles.border} ${sliderStyles.borderTopRight}"></div>
			</div>

			<div class="${styles.container} ${styles.grid}">
				<inline-characters characters="ctrl.characters"></inline-characters>
			</div>

			<div class="${sliderStyles.borderContainer} ${sliderStyles.borderContainerBottom}">
				<div class="${sliderStyles.border} ${sliderStyles.borderBottomLeft}"></div>
				<div class="${sliderStyles.border} ${sliderStyles.borderBottomRight}"></div>
			</div>
		`
	};

	return directive;
}

class CharactersGrid {
	// @ngInject
	constructor ($scope, $ngRedux) {
		const unsubscribe = $ngRedux.connect(myCharactersSelector)(this);
		$scope.$on('$destroy', unsubscribe);

		$ngRedux.dispatch(actionCreators.fetchMyCharactersThunk());
	}
}

export default component;
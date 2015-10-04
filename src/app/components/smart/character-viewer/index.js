'use strict';

import { actionCreators } from '../../../actions/characters';
import * as gw2 from '../../../actions/gw2-data';
import { characterViewerSelector } from '../../../selectors/characters';

function component () {
	let directive = {
		restrict: 'E',
		scope: {},
		bindToController: {
			mode: '@'
		},
		templateUrl: 'app/components/smart/character-viewer/view.html',
		controller: CharacterViewer,
		controllerAs: 'ctrl'
	};

	return directive;
}

class CharacterViewer {
	constructor ($stateParams, $scope, $ngRedux) {
		this.$ngRedux = $ngRedux;

		const unsubscribe = $ngRedux.connect(characterViewerSelector)(this);
		$scope.$on('$destroy', unsubscribe);
		$scope.$watch(() => {
			return $stateParams.name;
		}, (name) => {
			if (name) {
				$ngRedux.dispatch(actionCreators.fetchCharacterThunk(name));
			}

			$ngRedux.dispatch(actionCreators.selectCharacter(name));
		});
	}

	showTooltip (show, item, skin, upgrades, type, totalUpgrades) {
		const options = {
			item,
			skin,
			upgrades,
			type,
			totalUpgrades
		};

		this.$ngRedux.dispatch(gw2.actionCreators.showTooltip(show, options));
	}
}

export default component;
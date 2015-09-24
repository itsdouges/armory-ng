'use strict';

import { actionCreators } from '../../../actions/characters';
import { characterViewerSelector } from '../../../selectors/characters';

class CharacterViewerController {
	constructor ($stateParams, $scope, $ngRedux) {
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

	showTooltip (show, item, skin, upgrades) {
		console.log({ show, item, skin, upgrades });
	}
}

export default CharacterViewerController;
import { traitsSelector } from '../../../selectors/characters';

function component () {
	let directive = {
		restrict: 'E',
		scope: {},
		bindToController: {
			specialization: '=',
			traits: '='
		},
		controller: CharacterSpecialization,
		controllerAs: 'ctrl',
		template: require('./view.html')
	};

	return directive;
}

class CharacterSpecialization {
	constructor ($ngRedux, $scope) {
		const unsubscribe = $ngRedux.connect(traitsSelector)(this);
		$scope.$on('$destroy', unsubscribe);
	}

	isActive (found) {
		if (found > -1) {
			return 'active';
		}
	}
}

export default component;
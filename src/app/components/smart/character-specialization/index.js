import { traitsSelector } from '../../../selectors/characters';

import styles from './character-specialization.less';

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
		template: `
			<!-- TODO: Move traits into separate dumb component -->
			<!-- Calculate minor trait based on character level -->
			<!-- Contemplate making this component into a dumb component -->

			<div 
				class="${styles.specializationBg}" 
				style="background-image: url('{{ ctrl.gw2Specializations[ctrl.specialization].background }}');">
			</div>

			<div 
				class="${styles.specializationIcon}" 
				style="background-image: url('{{ ctrl.gw2Specializations[ctrl.specialization].background }}');">
				<div class="${styles.specializationIconTop}"></div>
				<div class="${styles.specializationIconBottom}"></div>
			</div>

			<specialization-trait
				active="true"
				class="${styles.minorTraitColumn}" 
				trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].minor_traits[0]]"></specialization-trait>

			<div class="${styles.majorTraitColumn}">
				<specialization-trait
					active="ctrl.isActive(ctrl.traits.indexOf(ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[0]].id))"
					trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[0]]"></specialization-trait>

				<specialization-trait
					active="ctrl.isActive(ctrl.traits.indexOf(ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[1]].id))"
					trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[1]]"></specialization-trait>

				<specialization-trait
					active="ctrl.isActive(ctrl.traits.indexOf(ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[2]].id))"
					trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[2]]"></specialization-trait>
			</div>

			<specialization-trait
				active="true"
				class="${styles.minorTraitColumn}" 
				trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].minor_traits[1]]"></specialization-trait>

			<div class="${styles.majorTraitColumn}">
				<specialization-trait
					active="ctrl.isActive(ctrl.traits.indexOf(ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[3]].id))"
					trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[3]]"></specialization-trait>

				<specialization-trait
					active="ctrl.isActive(ctrl.traits.indexOf(ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[4]].id))"
					trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[4]]"></specialization-trait>

				<specialization-trait
					active="ctrl.isActive(ctrl.traits.indexOf(ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[5]].id))"
					trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[5]]"></specialization-trait>
			</div>

			<specialization-trait
				active="true"
				class="${styles.minorTraitColumn}" 
				trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].minor_traits[2]]"></specialization-trait>

			<div class="${styles.majorTraitColumn}">
				<specialization-trait
					active="ctrl.isActive(ctrl.traits.indexOf(ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[6]].id))"
					trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[6]]"></specialization-trait>

				<specialization-trait
					active="ctrl.isActive(ctrl.traits.indexOf(ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[7]].id))"
					trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[7]]"></specialization-trait>

				<specialization-trait
					active="ctrl.isActive(ctrl.traits.indexOf(ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[8]].id))"
					trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[8]]"></specialization-trait>
			</div>
		`
	};

	return directive;
}

class CharacterSpecialization {
	// @ngInject
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
import styles from './specialization-trait.less';

function component () {
	return {
		restrict: 'E',
		scope: {},
		bindToController: {
			trait: '=',
			active: '='
		},
		template: `
			<div
				class="${styles.traitIcon} {{ ctrl.active ? '${styles.active}' : '' }}"
				style="background-image: url('{{ ctrl.trait.icon }}');"></div>
		`,
		controller: SpecializationTrait,
		controllerAs: 'ctrl'
	};
}

class SpecializationTrait {

}

export default component;
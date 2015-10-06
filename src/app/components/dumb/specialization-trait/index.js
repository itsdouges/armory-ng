function component () {
	return {
		restrict: 'E',
		scope: {},
		bindToController: {
			trait: '=',
			active: '='
		},
		template: require('./view.html'),
		controller: SpecializationTrait,
		controllerAs: 'ctrl'
	};
}

class SpecializationTrait {

}

export default component;
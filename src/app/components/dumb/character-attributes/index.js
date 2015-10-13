function component () {
	let directive = {
		restrict: 'E',
		scope: {},
		bindToController: {
			attributes: '=',
			profession: '@'
		},
		controller: CharacterAttributes,
		controllerAs: 'ctrl',
		template: require('./view.html'),
	};

	return directive;
}

class CharacterAttributes {
	
}

export default component;
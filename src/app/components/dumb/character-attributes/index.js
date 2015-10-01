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
		templateUrl: 'app/components/dumb/character-attributes/view.html',
	};

	return directive;
}

class CharacterAttributes {
	
}

export default component;
function component () {
	let directive = {
		restrict: 'E',
		scope: {},
		bindToController: {
			spec: '='
		},
		controller: CharacterTraits,
		controllerAs: 'ctrl',
		templateUrl: 'app/components/dumb/character-traits/view.html',
	};

	return directive;
}

class CharacterTraits {
	
}

export default component;
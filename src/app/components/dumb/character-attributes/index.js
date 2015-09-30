function component () {
	let directive = {
		restrict: 'E',
		scope: {},
		bindToController: {
			attributes: '=',
			proffession: '@'
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
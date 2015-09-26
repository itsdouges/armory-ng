function CharacterAttributes () {
	let directive = {
		restrict: 'E',
		scope: {
			attributes: '=',
			proffession: '@'
		},
		templateUrl: 'app/components/dumb/character-attributes/view.html',
	};

	return directive;
}

export default CharacterAttributes;
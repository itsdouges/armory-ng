function CharacterViewerDirective() {
	'ngInject';

	let directive = {
		restrict: 'E',
		templateUrl: 'app/components/character-viewer/view.html',
		controller: 'CharacterViewerController',
		controllerAs: 'ctrl'
	};

	return directive;
}

export default CharacterViewerDirective;
class CharacterViewerDirective {
	constructor () {
		'ngInject';

		let directive = {
			restrict: 'E',
			templateUrl: 'app/components/character-viewer/view.html',
			controller: 'CharacterViewerController',
			controllerAs: 'ctrl',
			bindToController: true
		};

		return directive;
	}
}

export default CharacterViewerDirective;
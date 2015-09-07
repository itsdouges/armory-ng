'use strict';

function CharactersStripDirective () {
	let link = (scope, element, attrs, controller) => {
		let slider = element.find('ul')[0];

		scope.$on('slider:set-transition-end-event', (e, cb) => {
			slider.addEventListener( 
			     'webkitTransitionEnd',
			     function(e) { 
			     	console.log(e);
			     	cb();
			     }, false);
		});
	};

	let directive = {
		restrict: 'E',
		controller: 'CharactersStripController as ctrl',
		scope: {},
		bindToController: {
			mode: '@'
		},
		link: link,
		templateUrl: 'app/components/characters-strip/view.html',
	};

	return directive;
}

export default CharactersStripDirective;
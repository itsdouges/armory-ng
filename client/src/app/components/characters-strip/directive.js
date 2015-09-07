'use strict';

function CharactersStripDirective () {
	let link = (scope, element, attrs, controller) => {
		element.find('ul')[0].addEventListener( 
		     'webkitTransitionEnd',
		     function(event) { 
		         alert( "Finished transition!" ); 
		     }, false);
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
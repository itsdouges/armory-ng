'use strict';

// NB: THESE SIZES ARE DUPLICATED FROM SIZES.LESS, MAKE SURE THEYRE IN SYNC!
const BIG_PC_WIDTH = 1300;
const PC_WIDTH = 1024;
const TABLET_WIDTH = 700;

function CharactersSliderDirective ($window, debounce) {
	let link = (scope, element, attrs, controller) => {
		let slider = element.find('ul')[0];

		let transitionEvent;
		let scopeEvent = (e, cb) => {
			transitionEvent = (e) => {

				if (e.propertyName === 'transform') {
					cb();
				}
				
				return true;
			};

			slider.addEventListener('webkitTransitionEnd', transitionEvent, false);
		};

		console.log('after');

		scope.$on('slider:set-transition-end-event', scopeEvent);

		scope.$on('$destroy', () => {
			slider.removeEventListener('webkitTransitionEnd', transitionEvent);
		});
	};

	let directive = {
		restrict: 'E',
		controller: 'CharactersSliderController as ctrl',
		scope: {},
		bindToController: {
			mode: '@'
		},
		link: link,
		templateUrl: 'app/components/smart/characters-slider/view.html',
	};

	return directive;
}

export default CharactersSliderDirective;
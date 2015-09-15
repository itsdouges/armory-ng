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

		scope.$on('slider:set-transition-end-event', scopeEvent);

		let resizeEvent = () => {
			let windowWidth = $window.innerWidth;
			if (windowWidth <= TABLET_WIDTH) {
				controller.setSliderItems(2);
			} else if (windowWidth <= PC_WIDTH) {
				controller.setSliderItems(3);
			} else if (windowWidth <= BIG_PC_WIDTH) {
				controller.setSliderItems(4);
			} else {
				controller.setSliderItems(5);
			}
		};

		let debounceResize = debounce.func(resizeEvent, 200);

		$window.addEventListener('resize', debounceResize, false);

		scope.$on('$destroy', () => {
			$window.removeEventListener('resize', debounceResize);
			slider.removeEventListener('webkitTransitionEnd', transitionEvent);
			// scope.$off('slider:set-transition-end-event', scopeEvent);
		});

		resizeEvent();
	};

	let directive = {
		restrict: 'E',
		controller: 'CharactersSliderController as ctrl',
		scope: {},
		bindToController: {
			mode: '@'
		},
		link: link,
		templateUrl: 'app/components/characters-slider/view.html',
	};

	return directive;
}

export default CharactersSliderDirective;
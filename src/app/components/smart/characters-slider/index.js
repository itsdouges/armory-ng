'use strict';

import { actionCreators } from '../../../actions/user/characters';
import { myCharactersSelector } from '../../../selectors/characters';

function component ($window, debounce) {
	let link = (scope, element, attrs, controller) => {
		let inlineCharacters = element.find('inline-characters')[0],
			transitionEvent;

		let scopeEvent = (e, cb) => {
			transitionEvent = (e) => {
				if (e.propertyName === 'transform') {
					cb();
				}
				
				return true;
			};

			inlineCharacters.addEventListener('webkitTransitionEnd', transitionEvent, false);
		};

		scope.$on('slider:set-transition-end-event', scopeEvent);
		scope.$on('$destroy', () => {
			inlineCharacters.removeEventListener('webkitTransitionEnd', transitionEvent);
		});
	};

	let directive = {
		restrict: 'E',
		controller: CharactersSlider,
		controllerAs: 'ctrl',
		scope: {},
		bindToController: {
			mode: '@'
		},
		link: link,
		template: require('./view.html')
	};

	return directive;
}

function CharactersSlider ($scope, $ngRedux) {
	const SLIDER_TRANSLATE_PERCENTAGE = 100;

	let scope = this,
		characters,
		transitionDirection,
		sliderItems,
		currentPosition,
		loaded = false;

	function init () {
		scope.sliderControlsDisabled = true;

		const UNSUBSCRIBE = $ngRedux.subscribe(() => {
			const state = $ngRedux.getState();
			const selector = myCharactersSelector(state);

			if (!selector.characters) {
				return;
			}

			sliderItems = selector.columns;

			if (selector.characters !== characters) {
				characters = selector.characters;
				scope.hasCharacters = selector.hasCharacters;
				initializeSlider();
			}
		});

		$scope.$on('$destroy', UNSUBSCRIBE);

		switch(scope.mode) {
			case 'authenticated':
				$ngRedux.dispatch(actionCreators.fetchMyCharactersThunk());
				break;

			default:
				throw 'Mode not supported';
				break;
		}

		setSliderStyle(SLIDER_TRANSLATE_PERCENTAGE);
	}

	function initializeSlider () {
		if (characters.length > sliderItems) {
			scope.sliderControlsDisabled = false;
		}

		if (!loaded) {
			$scope.$emit('slider:set-transition-end-event', () => {
				$scope.$apply(() => {
					let offset;

					if (transitionDirection === 'previous') {
						offset = sliderItems;
					} else if (transitionDirection === 'next') {
						offset = -sliderItems;
					} else {
						throw 'transition not handled';
					}

					console.log(`offsetting by ${offset}`);
					setCharactersOffset(offset);
				});

				requestAnimationFrame(() => {
					$scope.$apply(() => {
						setSliderStyle(SLIDER_TRANSLATE_PERCENTAGE, true);
					});
				});
			});

			loaded = true;
		}

		setCharactersOffset(sliderItems);

		if (characters.length <= sliderItems) {
			setSliderStyle(0);
			return;
		}
	}

	function setCharactersOffset(offset) {
		var tempc,
			i,
			maxItems = sliderItems * 3 + 2;

		if (offset >= 0) {
			tempc = characters;

			for(i = 0; i < offset; i++) {
				tempc.unshift(tempc.pop());
			}
		} else {
			tempc = characters;
			offset *= -1;
			
			for(i = 0; i < offset; i++) {
				tempc.push(tempc.shift());
			}
		}

		scope.characters = tempc.slice(0, maxItems);
	}

	function setSliderStyle(translateX, noTransition) {
		let style = {
			transform: `translate3d(-${translateX}%, 0, 0)`,
			'webkit-transform': `translate3d(-${translateX}%, 0, 0)`
		};

		if (noTransition) {
			style.transition = 'inherit';
		}

		scope.sliderStyle = style;
	}

	this.next = () => {
		transitionDirection = 'next';
		setSliderStyle(SLIDER_TRANSLATE_PERCENTAGE * 2);
	};

	this.previous = () => {
		transitionDirection = 'previous';
		setSliderStyle(0);
	};

	init();
}

export default component;
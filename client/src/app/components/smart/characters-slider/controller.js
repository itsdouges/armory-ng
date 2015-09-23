'use strict';

import { actionCreators } from '../../../actions/user/characters';
import { myCharactersSelector } from '../../../selectors/characters';

function CharactersSliderController ($scope, $ngRedux) {
	let scope = this;
	let characters;
	const sliderTranslateX = 100;
	let transitionDirection;

	let sliderItems;
	let currentPosition;

	let loaded = false;

	function init () {
		scope.sliderControlsDisabled = true;

		const unsubscribe = $ngRedux.subscribe(() => {
			let state = $ngRedux.getState();
			let my = myCharactersSelector(state);

			if (!my.characters) {
				return;
			}

			sliderItems = my.columns;

			if (my.characters !== characters) {
				characters = my.characters;
				scope.hasCharacters = my.hasCharacters;
				sup();
			}
		});

		$scope.$on('$destroy', unsubscribe);

		switch(scope.mode) {
			case 'authenticated':
				$ngRedux.dispatch(actionCreators.fetchMyCharactersThunk());
				break;

			default:
				throw 'Mode not supported';
				break;
		}

		setSliderStyle(sliderTranslateX);
	}

	function sup () {
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
						setSliderStyle(sliderTranslateX, true);
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
		setSliderStyle(sliderTranslateX * 2);
	};

	this.previous = () => {
		transitionDirection = 'previous';
		setSliderStyle(0);
	};

	init();
}

export default CharactersSliderController;
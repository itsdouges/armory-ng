'use strict';

function CharactersStripController (charactersService, $scope) {
	let scope = this;
	let characters;
	const sliderTranslateX = 100;

	// todo: browser resize event, change amountviewd depending.
	let sliderItems = 4;
	let currentPosition;

	function init () {
		if (scope.mode === 'authenticated') {
			charactersService
				.myList()
				.then((items) => {
					characters = items;
					setCharactersOffset(sliderItems);

					$scope.$emit('slider:set-transition-end-event', () => {

						// requestAnimationFrame(() => {
						// 	setSliderStyle(sliderTranslateX);
						// });

						$scope.$apply(() => {
							console.log('ay lmao');
							
							setCharactersOffset(-sliderItems);
						});



						requestAnimationFrame(() => {
							setSliderStyle(sliderTranslateX, true);
							// toggleSliderTransitions();

							$scope.$apply();
						});

					});					
				});
		}

		setSliderStyle(sliderTranslateX);
	}

	this.next = (e) => {
		// setCharactersOffset(-sliderItems);
		setSliderStyle(sliderTranslateX * 2);
		// 
		// requestAnimationFrame(() => {
		// 	setSliderStyle(sliderTranslateX);
		// });
	};

	this.previous = (e) => {
		setCharactersOffset(sliderItems);
		// setSliderStyle(0);
	};

	// function disableSliderTransitions() {
	// 	scope.sliderStyle.disable
	// }

	function setCharactersOffset(offset) {
		var tempc,
			i,
			maxItems = sliderItems * 3;

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

	function toggleSliderTransitions() {
		
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

	this.selectCharacter = (name) => {
		$scope.$emit('char-selected', name);
	};

	init();
}

export default CharactersStripController;
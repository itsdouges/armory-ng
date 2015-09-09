'use strict';

function CharactersStripController (charactersService, $scope, $state) {
	let scope = this;
	let characters;
	const sliderTranslateX = 100;
	let transitionDirection;

	let sliderItems;
	let currentPosition;

	function init () {
		if (scope.mode === 'authenticated') {
			charactersService
				.myList()
				.then((items) => {
					characters = items;
					characters.push.apply(items, items); // TODO: Implement some real handling of small data

					setCharactersOffset(sliderItems);

					$scope.$emit('slider:set-transition-end-event', () => {
						$scope.$apply(() => {
							if (transitionDirection === 'previous') {
								setCharactersOffset(sliderItems);
							} else if (transitionDirection === 'next') {
								setCharactersOffset(-sliderItems);
							} else {
								throw 'transition not handled';
							}
						});

						requestAnimationFrame(() => {
							$scope.$apply(() => {
								setSliderStyle(sliderTranslateX, true);
							});
						});
					});					
				});
		}

		setSliderStyle(sliderTranslateX);
	}

	this.next = (e) => {
		transitionDirection = 'next';
		setSliderStyle(sliderTranslateX * 2);
	};

	this.previous = (e) => {
		transitionDirection = 'previous';
		setSliderStyle(0);
	};

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

	this.setSliderItems = (numberOfItems) => {
		sliderItems = numberOfItems;
	};

	// this.selectCharacter = ($event, name) => {
	// 	$scope.$emit('char-selected', name);
	// 	console.log(name);

	// 	console.log($event);
	// 	// $state.go('/me');
	// };

	init();
}

export default CharactersStripController;
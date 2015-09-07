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
				});
		}

		setSliderStyle(sliderTranslateX);
	}

	this.next = (e) => {
		// setSliderStyle(sliderTranslateX * 2);
		setCharactersOffset(sliderItems);
		// requestAnimationFrame(() => {
		// 	setSliderStyle(sliderTranslateX);
		// });
	};

	this.previous = (e) => {
		setCharactersOffset(-sliderItems);
		// setSliderStyle(0);
	};

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
		// console.log(scope.characters.length);
	}

	function setSliderStyle(x) {
		scope.sliderStyle = {
			transform: `translate3d(-${x}%, 0, 0)`,
			'webkit-transform': `translate3d(-${x}%, 0, 0)`
		};
	}

	this.selectCharacter = (name) => {
		$scope.$emit('char-selected', name);
	};

	init();
}

export default CharactersStripController;
'use strict';

// todo: move logic to controller + unit test bro.
// todo: add in edge cases to handle mouse location in the browser.
// todo: disable for touch screens

function MouseFollowDirective ($window) {
	let state = {};
	let domEle;
	let mouse = {};

	function link (scope, element, attrs) {
		domEle = element[0];

		scope.$watch(() => {
			return domEle.offsetWidth;
		}, () => {
			calculateState();
			calculateElementPosition();
		});

		function calculateState() {
			let elementWidth = domEle.offsetWidth;
			let elementHeight = domEle.offsetHeight;

			let elementRelativeToWindowPosition = domEle.getBoundingClientRect();
			if (elementRelativeToWindowPosition.right > $window.innerWidth) {
				state.flipRight = true;
			} else if (state.flipRight && elementRelativeToWindowPosition.right + elementWidth <= $window.innerWidth) {
				state.flipRight = false;
			}

			if (elementRelativeToWindowPosition.bottom > $window.innerHeight) {
				state.flipTop = true;
			} else if (state.flipTop && elementRelativeToWindowPosition.bottom + elementHeight <= $window.innerHeight) {
				state.flipTop = false;
			}
		}

		function calculateElementPosition() {
			let elementWidth = domEle.offsetWidth;
			let elementHeight = domEle.offsetHeight;

			let x = mouse.x;
			let y = mouse.y;

			if (state.flipRight) {
				x -= elementWidth;
			}

			if (state.flipTop) {
				y -= elementHeight;
			}

			let css = `translate3d(${x}px, ${y}px, 0)`;
			element[0].style.transform = css;
		}

		function onMouseMove(e) {
			mouse.x = e.clientX;
			mouse.y = e.clientY;

			calculateState();
			calculateElementPosition();
		}

		$window.addEventListener('mousemove', onMouseMove, false);
		element.on('$destroy', () => {
			$window.removeEventListener('mousemove', onMouseMove);
		});
	}

	let directive = {
		restrict: 'A',
		link: link
	};

	return directive;
}

export default MouseFollowDirective;
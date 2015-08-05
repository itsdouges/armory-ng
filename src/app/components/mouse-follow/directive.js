// todo: move logic to controller + unit test bro.
// todo: add in edge cases to handle mouse location in the browser.
// todo: disable for touch screens

function MouseFollowDirective ($window) {
	'ngInject';

	function link (scope, element, attrs) {
		function onMouseMove(e) {
			let css = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
			element[0].style.transform = css;
		}

		$window.addEventListener('mousemove', onMouseMove, false);

	  element.on('$destroy', function () {
			$window.removeEventListener('mousemove', onMouseMove, false);
		 });
	}

	let directive = {
		restrict: 'A',
		link: link
	};

	return directive;
}

export default MouseFollowDirective;
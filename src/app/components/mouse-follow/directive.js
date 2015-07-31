// Parked for now.

function MouseFollowDirective ($window) {
	'ngInject';

	let _window = $window;

	function link (scope, element, attrs) {
		let offsetX;
		let offsetY;

		console.log(scope.autoPosition);

		function onMouseMove(e) {
			if (!offsetX) {
				offsetX = e.pageX;
				offsetY = e.pageY;
			}

			let css = `translate3d(${e.pageX - offsetX}px, ${e.pageY - offsetY}px, 0)`;
			element[0].style.transform = css;
		}

		angular.element(_window).on('mousemove', onMouseMove);

	  element.on('$destroy', function () {
	  	// TODO: This is currently a memory leak. Fix it.
			angular.element(_window).off('mousemouse', onMouseMove);
		 });
	}

	let directive = {
		restrict: 'A',
		link: link,
		scope: {
			autoPosition: '@'
		}
	};

	return directive;
}

export default MouseFollowDirective;
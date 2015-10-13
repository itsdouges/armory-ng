'use strict';

import { actionCreators } from '../../../actions/window';

// @ngInject
function component ($window, debounce) {
	let link = (scope, element, attributes, controller) => {
		let ele = element[0];

		function onResizeEvent () {
			controller.setSpacerHeight(ele.offsetHeight);
		}

		let debounceResize = debounce.func(onResizeEvent, 200);
		$window.addEventListener('resize', debounceResize, false);

		scope.$on('$destroy', () => {
			$window.removeEventListener('resize', debounceResize);
		});

		onResizeEvent();
	};

	let directive = {
		restrict: 'E',
		link: link,
		scope: {},
		controller: Footer,
		controllerAs: 'ctrl',
		template: require('./view.html')
	};

	return directive;
}

/*@ngInject*/
function Footer ($ngRedux) {
	this.setSpacerHeight = (height) => {
		$ngRedux.dispatch(actionCreators.setBottomSpacer(height));
	};
}

export default component;
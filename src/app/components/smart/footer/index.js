'use strict';

import styles from './footer.less';
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
		template: `
		<ul class="${styles.links}">
			<li>
				<a title="Come join in the discussion!" href="https://www.reddit.com/r/gw2armory">
					<i class="fa fa-reddit"></i>
				</a>
			</li>

			<li>
				<a title="Vote for your favourite new feature!" href="https://trello.com/b/qGvDe622/gw2armory">
					<i class="fa fa-trello"></i>
				</a>
			</li>

			<li>
				<a title="Check out the code!" href="https://github.com/madou/armory-ng">
					<i class="fa fa-github"></i>
				</a>
			</li>
		</ul>

		<p>
			© 2010–2015 ArenaNet, LLC. All rights reserved. Guild Wars, Guild Wars 2, Guild Wars 2: Heart of Thorns, ArenaNet, NCSOFT, the Interlocking NC Logo, and all associated logos and designs are trademarks or registered trademarks of NCSOFT Corporation. All other trademarks are the property of their respective owners.
		</p>
		`
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
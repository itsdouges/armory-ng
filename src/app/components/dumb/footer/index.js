'use strict';

import styles from './footer.less';
import { actionCreators } from '../../../actions/window';

// @ngInject
function component ($window, debounce, $timeout) {
	let directive = {
		restrict: 'E',
		scope: {},
		controller: Footer,
		controllerAs: 'ctrl',
		template: `
		<ul class="${styles.links}">
			<li>
				<a
					target="_blank" 
					title="gw2armory roadmap" 
					href="https://trello.com/b/qGvDe622">
					<i class="fa fa-trello"></i>
				</a>
			</li>

			<li>
				<a
					target="_blank" 
					title="Check out the code" 
					href="https://github.com/madou/gw2armory.com">
					<i class="fa fa-github"></i>
				</a>
			</li>
		</ul>

		<p>
			© 2010–2015 ArenaNet, LLC. All rights reserved. Guild Wars, Guild Wars 2, Guild Wars 2: Heart of Thorns, ArenaNet, NCSOFT, the Interlocking NC Logo, and all associated logos and designs are trademarks or registered trademarks of NCSOFT Corporation. All other trademarks are the property of their respective owners.
		</p>

		<p>
			Found a bug? Thought of a kick-ass feature? <a href="https://www.reddit.com/r/gw2armory"><strong>Make a post on reddit</strong></a>. Be sure to check out the <a href="https://trello.com/b/qGvDe622"><strong>roadmap on trello first!</strong></a>
		</p>

		<build-stats></build-stats>
		`
	};

	return directive;
}

/*@ngInject*/
function Footer () {
}

export default component;
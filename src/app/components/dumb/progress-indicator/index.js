'use strict';

import styles from './progress-indicator.less';
import iconStyles from '../../../styles/icons/icons.less';
import accessibilityStyles from '../../../styles/helpers/accessibility.less';

function component () {
	let directive = {
		restrict: 'E',
		controller: ProgressIndicator,
		controllerAs: 'ctrl',
		scope: {},
		bindToController: {
			'busy': '=',
			'size': '@'
		},
		template: `
			<i ng-if="ctrl.busy" class="${iconStyles.icon} ${styles.progress} ${styles.small}">
				<span class="${accessibilityStyles.hideText}">Loading..</span>
			</i>
		`
	};

	return directive;
}

class ProgressIndicator {
	constructor () {

	}
}

export default component;
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
			<i ng-if="ctrl.busy" class="${iconStyles.icon} {{ ctrl.getIconSize(ctrl.size) }} ${styles.progress}">
				<span class="${accessibilityStyles.hideText}">Loading..</span>
			</i>
		`
	};

	return directive;
}

class ProgressIndicator {
	constructor () {

	}

	getIconSize (size) {
		console.log(size);
		return styles[size || 'small'];
	}
}

export default component;
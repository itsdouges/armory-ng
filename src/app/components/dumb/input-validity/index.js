'use strict';

import styles from './input-validity.less';

function component () {
	let directive = {
		restrict: 'E',
		controller: InputValidity,
		controllerAs: 'inputValidity',
		bindToController: {
			valid: '=',
			busy: '='
		},
		scope: {},
		template: `
			<span ng-if="!inputValidity.busy">
				<i ng-class="inputValidity.getClass()"></i>
			</span>

			<progress-indicator
				size="mini"
				busy="inputValidity.busy"></progress-indicator>
		`
	};

	return directive;
}

class InputValidity {
	getClass () {
		if (this.valid) {
			return ['fa', 'fa-check', styles.valid];
		} else {
			return ['fa', 'fa-times', styles.invalid];
		}
	}
}

export default component;
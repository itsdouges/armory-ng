'use strict';

import styles from './input-validity.less';

function component () {
	let directive = {
		restrict: 'E',
		controller: InputValidity,
		controllerAs: 'ctrl',
		bindToController: {
			valid: '=',
			busy: '='
		},
		scope: {},
		template: `
			<span ng-if="!ctrl.busy">
				<i ng-if="!ctrl.valid" class="fa fa-times"></i>
				<i ng-if="ctrl.valid" class="fa fa-check"></i>
			</span>

			<progress-indicator busy="ctrl.busy"></progress-indicator>
		`
	};

	return directive;
}

class InputValidity {
	constructor () {

	}
}

export default component;
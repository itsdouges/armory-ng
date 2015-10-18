'use strict';

import styles from './busy-button.less';
import formStyles from '../../../styles/forms/forms.less';
import accessibilityStyles from '../../../styles/helpers/accessibility.less';

function component () {
	let directive = {
		restrict: 'E',
		bindToController: {
			busy: '=',
			buttonDisabled: '='
		},
		controller: BusyButton,
		controllerAs: 'ctrl',
		template:`
			<button class="${formStyles.primary}" ng-class="ctrl.busy ? '${accessibilityStyles.busy}' : ''" ng-disabled="ctrl.buttonDisabled || ctrl.busy">
				<span ng-show="!ctrl.busy" ng-transclude></span>
				
				<progress-indicator size="mini" busy="ctrl.busy"></progress-indicator>
			</button>
		`,
		scope: {},
		transclude: true
	};

	return directive;
}

export class BusyButton {

}

export default component;
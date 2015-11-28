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
		controllerAs: 'busyButton',
		template:`
			<button 
				class="${formStyles.button} ${formStyles.primary} ${styles.button}" 
				ng-class="busyButton.busy ? '${accessibilityStyles.busy}' : ''" ng-disabled="busyButton.buttonDisabled || busyButton.busy">
				<span ng-show="!busyButton.busy" ng-transclude></span>
				
				<progress-indicator 
					size="mini"
					busy="busyButton.busy"></progress-indicator>
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
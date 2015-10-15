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
				
				<span ng-if="ctrl.busy" class="icon icon-mini icon-progress">
					<span class="${accessibilityStyles.hideText}">Loading..</span>
				</span>
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
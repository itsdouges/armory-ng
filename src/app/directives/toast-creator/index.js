import { toastSelector } from '../../selectors/toast';

function component () {
	return {
		restrict: 'A',
		bindToController: {
			message: '@',
			icon: '@',
			location: '@',
			timeout: '@'
		},
		controller: ToastCreator,
		controllerAs: 'ctrl'
	};
}

class ToastCreator {
	// @ngInject
	constructor ($ngRedux, $scope, $element, $compile) {
		const unsubscribe = $ngRedux.connect(toastSelector)(this);
		$scope.$on('$destroy', unsubscribe);

		$scope.$watch(() => {
			return this.toast;
		}.bind(this), (current, previous) => {
			if (current !== previous) {
				console.log('Toast added!');

        const toast = $compile(`<toast class="top" message="${current.message}"></toast>`)($scope);
        $element.parent().append(toast);
			}
		});
	}
}

export default component;
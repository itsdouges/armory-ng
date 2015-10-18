import styles from './toast.less';

function component () {
	return {
		restrict: 'E',
		scope: {},
		bindToController: {
			message: '@',
			icon: '@',
			location: '@',
			timeout: '@'
		},
		template: `
			<strong>{{ ctrl.message }}</strong>
		`,
		controller: Toast,
		controllerAs: 'ctrl'
	};
}

class Toast {
	/*@ngInject*/
	constructor ($timeout, $scope, $element) {
		$element.addClass(styles[this.location || 'top'])

		$timeout(() => {
			$element.remove();
			$scope.$destroy();
		}, this.timeout || 3000);
	}
}

export default component;
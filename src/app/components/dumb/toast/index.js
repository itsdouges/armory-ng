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
		template: require('./toast.html'),
		controller: Toast,
		controllerAs: 'ctrl'
	};
}

class Toast {
	constructor ($timeout, $scope, $element) {
		$timeout(() => {
			console.log('Killing toast!');
			$element.remove();
			$scope.$destroy();
		}, this.timeout || 3000);
	}
}

export default component;
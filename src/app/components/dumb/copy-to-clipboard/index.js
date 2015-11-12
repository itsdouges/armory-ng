import styles from './copy-to-clipboard.less';

function component () {
	return {
		restrict: 'E',
		scope: {},
		bindToController: {
			text: '@',
			sendToast: '&'
		},
		controller: CopyToClipboard,
		controllerAs: 'ctrl',
		template: `
			<input 
				class="${styles.copyToClipboard}" 
				title="Copy to clipboard" 
				type="text" 
				ng-model="ctrl.text" 
				readonly="readonly" />

			<a 
				title="Copy to clipboard" 
				href="">
				<i class="fa fa-clipboard"></i>
			</a>
		`
	};
}

class CopyToClipboard {
	// @ngInject
	constructor ($element, $scope, $window, $document) {
		this.sendToast = this.sendToast();

		function onClick () {
			let textboxElement = $element[0].firstElementChild;
			textboxElement.setSelectionRange(0, textboxElement.value.length);
			this.sendToast('Press ctrl+c to copy!');
		}

		$element[0].addEventListener('click', onClick.bind(this));

		$scope.$on('$destroy', () => {
			$element[0].removeEventListener('click', onClick.bind(this));
		});
	}
}

export default component;
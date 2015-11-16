import styles from './avatar.less';

export default function component () {
	return {
		restrict: 'E',
		scope: {},
		controller: Avatar,
		controllerAs: 'ctrl',
		bindToController: {
			name: '@',
			imageLocation: '@',
			link: '@'
		},
		template: `
				<a ng-href="{{ ctrl.link }}">
					<img 
						class="${styles.image}"
						ng-src="{{ ctrl.imageLocation }}" />
				</a>
				
				<h2 class="${styles.name}">			
					<a ng-href="{{ ctrl.link }}">
						<strong>{{ ctrl.name }}</strong>
					</a>
				</h2>
		`
	};
}

class Avatar {

}
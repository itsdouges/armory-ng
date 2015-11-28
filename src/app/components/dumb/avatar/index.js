import styles from './avatar.less';

export default function component () {
	return {
		restrict: 'E',
		scope: {},
		controller: Avatar,
		controllerAs: 'avatar',
		bindToController: {
			name: '@',
			imageLocation: '@',
			link: '@'
		},
		template: `
			<a 
				title="{{ avatar.name }}"
				ng-href="{{ avatar.link }}">
				<img 
					class="${styles.image}"
					ng-src="{{ avatar.imageLocation }}" />

				<h2 class="${styles.name}">	
					<strong>{{ avatar.name }}</strong>
				</h2>
			</a>
		`
	};
}

class Avatar {

}
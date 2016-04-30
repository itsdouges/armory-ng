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
			link: '@',
			smallMode: '@'
		},
		template: `
		<a 
			class="${styles.inherit}"
			title="{{ avatar.name }}"
			ng-href="{{ avatar.link }}">
			<img
				ng-class="avatar.smallMode ? '${styles.smallMode}' : ''"
				class="${styles.image} ${styles.inherit}"
				ng-src="{{ avatar.imageLocation }}" />

			<h2 ng-if="!avatar.smallMode" class="${styles.name}">	
				<strong>{{ avatar.name }}</strong>
			</h2>
		</a>
		`
	};
}

class Avatar {

}
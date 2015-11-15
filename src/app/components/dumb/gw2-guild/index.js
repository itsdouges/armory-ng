import styles from './gw2-guild.less';

export default function component () {
	return {
		restrict: 'E',
		scope: {},
		controller: Gw2Guild,
		controllerAs: 'ctrl',
		bindToController: {
			name: '@',
			tag: '@',
			emblem: '='
		},
		template: `
				<a 
				title="View {{ ctrl.name }}"
				ng-href="/#!/g/{{ ctrl.name }}">
					<img 
					class="${styles.guildImage}"
					ng-src="https://guilds.gw2w2w.com/guilds/{{ ctrl.name }}/256.svg" />
				</a>
				
				<h2 class="${styles.guildName}">			
					<a 
					title="View {{ ctrl.name }}"
					ng-href="/#!/g/{{ ctrl.name }}">
						<strong>{{ ctrl.name }} [{{ ctrl.tag }}]</strong>
					</a>
				</h2>
		`
	};
}

class Gw2Guild {
	constructor () {

	}
}
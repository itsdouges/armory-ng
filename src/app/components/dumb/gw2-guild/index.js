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
			<img 
				class="${styles.guildImage}"
				ng-src="https://guilds.gw2w2w.com/guilds/{{ ctrl.name }}/256.svg" />
			<h2 class="${styles.guildName}">Representing: <strong>{{ ctrl.name }} [{{ ctrl.tag }}]</strong></h2>
		`
	};
}

class Gw2Guild {
	constructor () {

	}
}
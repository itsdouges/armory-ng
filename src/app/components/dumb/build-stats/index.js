import env from '../../../app.env';
import styles from './build-stats.less';

export default function component () {
	return {
		restrict: 'E',
		scope: {},
		controller: BuildStats,
		controllerAs: 'ctrl',
		template: `
			<div>{{ ctrl.date }}</div>
			<div>{{ ctrl.version }}</div>
		`
	};
}

class BuildStats {
	constructor () {
		this.date = `Last built: ${env.build.date}`;
		this.version = `App hash: ${env.build.version}`;
	}
}
import env from '../../../app.env';
import styles from './build-stats.less';

export default function component () {
	return {
		restrict: 'E',
		scope: {},
		controller: BuildStats,
		controllerAs: 'ctrl',
		template: `
			<div>{{ ctrl.data }}</div>
		`
	};
}

class BuildStats {
	constructor () {
		this.data = `${env.build.version} | ${env.build.date}`;
	}
}
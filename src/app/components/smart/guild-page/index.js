import guildActions from '../../../actions/guilds'
import { guildsSelector } from '../../../selectors/guilds';
import styles from './guild-page.less';

export default function component () {
	return {
		restrict: 'E',
		scope: {},
		controller: GuildPage,
		controllerAs: 'ctrl',
		template: `
			<gw2-guild
				name="{{ ctrl.guild.name }}"
				tag="{{ ctrl.guild.tag }}"></gw2-guild>

			<characters-grid
				mode="public"
				fetching="ctrl.fetching"
				characters="ctrl.guild.characters"></characters-grid>

			<br/>

			<social-buttons 
				send-toast="ctrl.sendToast"
				location="{{ ctrl.location }}"></social-buttons>
		`
	};
}

// @ngInject
function GuildPage ($ngRedux, $stateParams, $scope, $location) {
	var that = this;

	function selectGuild (name) {
		$ngRedux.dispatch(guildActions.selectGuild(name));

		if (name) {
			$ngRedux.dispatch(guildActions.fetchGuildThunk(name));
		}
	}

	function constructor () {
		const unsubscribe = $ngRedux.connect(guildsSelector)(that);
		$scope.$on('$destroy', unsubscribe);

		$scope.$watch(() => {
			return $stateParams.guildName;
		}, (name) => {
			selectGuild(name);
		});

		that.location = $location.$$absUrl;
		selectGuild($stateParams.guildName);
	}

	constructor();
}
import { actionCreators } from '../../../actions/users';
import { characterViewerSelector } from '../../../selectors/characters';
import { userDataSelector } from '../../../selectors/user';
import characterActions from '../../../actions/characters';
import gw2Actions from '../../../actions/gw2-data';
import containerStyles from '../../../styles/container/container.less';
import showToast from '../../../actions/toast';

function component () {
	return {
		restrict: 'E',
		scope: {},
		controller: CharacterPage,
		controllerAs: 'ctrl',
		bindToController: {
			mode: '@',
		},
		template: `	
			<characters-slider
				characters="ctrl.characters"
				mode="{{ ctrl.mode }}"></characters-slider>

			<br/>

			<div class="${containerStyles.flexContainer}">
				<character-viewer
					ng-if="ctrl.character" 
					mode="{{ ctrl.mode }}"
					character="ctrl.character"
					fetching-gw2-data="ctrl.fetchingGw2Data"
					items="ctrl.items"
					skins="ctrl.skins",
					attributes="ctrl.attributes"
					specializations="ctrl.specializations"
					show-tooltip="ctrl.showTooltip"></character-viewer>

				<item-tooltip></item-tooltip>
			</div>

			<progress-indicator 
				style="display: block; text-align: center;"
				busy="ctrl.fetching"></progress-indicator>

			<br ng-if="ctrl.fetching" />

			<social-buttons 
				send-toast="ctrl.sendToast"
				location="{{ ctrl.location }}"></social-buttons>
		`
	};
}

// TODO: Make this better. Variable outside of the class? lmao!
let outng;
class CharacterPage {
	// @ngInject
	constructor ($ngRedux, $stateParams, $scope, $location) {
		outng = $ngRedux;
		this.$location = $location;
		this.$ngRedux = $ngRedux;
		this.$stateParams = $stateParams;

		const unsubscribe = $ngRedux.connect(characterViewerSelector)(this);
		const unsubscribe2 = $ngRedux.connect(userDataSelector)((state) => {
			this.user = state.user.alias;
		}.bind(this));

		$scope.$on('$destroy', unsubscribe);
		$scope.$watch(() => {
			return $stateParams.name;
		}, (name) => {
			this.$ngRedux.dispatch(characterActions.selectCharacter(name));

			if (name) {
				this.fetchCharacter(this.$stateParams.name);
			}
		}.bind(this));

		$ngRedux.dispatch(characterActions.selectCharacter($stateParams.name));
		this.fetchCharacter($stateParams.name);
	}

	fetchCharacter (name) {
		switch (this.mode) {
			case 'public':
				this.$ngRedux.dispatch(characterActions.fetchCharacterThunk(name));
				this.location = this.$location.$$absUrl;
				break;

			case 'authenticated':
				this.$ngRedux.dispatch(characterActions.fetchCharacterThunk(name, true));
				this.location = this.$location.$$absUrl.replace('me', this.user);
				break;

			default:
				throw 'Mode not handled';
		}
	}

	showTooltip (params) {
		const options = {
			item: params.item,
			skin: params.skin,
			upgrades: params.upgrades,
			type: params.type,
			upgradeCount: params.upgradeCount
		};

		outng.dispatch(gw2Actions.showTooltip(params.show, options));
	}

	sendToast (message) {
		outng.dispatch(showToast(message));
	}
}

export default component;
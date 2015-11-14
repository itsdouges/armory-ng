import { characterViewerSelector } from '../../../selectors/characters';
import { userDataSelector } from '../../../selectors/user';

import userActions from '../../../actions/user';
import usersActions from '../../../actions/users';
import characterActions from '../../../actions/characters';
import gw2Actions from '../../../actions/gw2-data';
import showToast from '../../../actions/toast';

import containerStyles from '../../../styles/container/container.less';

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
			<characters-grid
				fetching="ctrl.fetchingCharacters"
				characters="ctrl.characters"
				mode="{{ ctrl.mode }}"
				display-mode="slider"></characters-grid>

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

		const unsubscribe = $ngRedux.connect(characterViewerSelector)((state) => {
			this.user = state.user;
			this.fetching = state.fetching;
			this.character = state.character;
			this.items = state.items;
			this.skins = state.skins;
			this.fetchingGw2Data = state.fetchingGw2Data;
			this.attributes = state.attributes;
			this.specializations = state.specializations;

			switch (this.mode) {
				case 'public':
					this.characters = state.users.data[$stateParams.alias] && state.users.data[$stateParams.alias].characters;
					break;
				
				case 'authenticated':
					this.characters = state.user.characters;
					break;
			}

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

		if ($stateParams.name) {
			this.fetchCharacter($stateParams.name);
		}

		switch (this.mode) {
			case 'public':
				this.$ngRedux.dispatch(usersActions.fetchUserCharactersThunk(this.$stateParams.alias));
				this.location = this.$location.$$absUrl;
				break;

			case 'authenticated':
				this.$ngRedux.dispatch(userActions.fetchMyCharactersThunk());
				this.location = this.$location.$$absUrl.replace('me', this.user.alias);
				break;
		}
	}

	fetchCharacter (name) {
		switch (this.mode) {
			case 'public':
				this.$ngRedux.dispatch(characterActions.fetchCharacterThunk(name));
				this.location = this.$location.$$absUrl;
				break;

			case 'authenticated':
				this.$ngRedux.dispatch(characterActions.fetchCharacterThunk(name, true));
				this.location = this.$location.$$absUrl.replace('me', this.user.alias);
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
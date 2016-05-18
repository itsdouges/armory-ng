import { characterViewerSelector } from '../../../selectors/characters';
import { userDataSelector } from '../../../selectors/user';

import userActions from '../../../actions/user';
import usersActions from '../../../actions/users';
import characterActions from '../../../actions/characters';
import gw2Actions from '../../../actions/gw2-data';
import showToast from '../../../actions/toast';

import containerStyles from '../../../styles/container/container.less';
import styles from './character-page.less';

export default function component () {
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

            <character-viewer
                alias="{{ ctrl.alias }}"
                ng-if="ctrl.character"
                mode="{{ ctrl.mode }}"
                character="ctrl.character"
                fetching-gw2-data="ctrl.fetchingGw2Data"
                items="ctrl.items"
                skins="ctrl.skins"
                attributes="ctrl.attributes"
                specializations="ctrl.specializations"
                show-tooltip="ctrl.showTooltip"></character-viewer>

            <item-tooltip></item-tooltip>

            <progress-indicator
                ng-if="ctrl.fetching && !ctrl.character"
                class="${styles.progressIndicator}"
                busy="ctrl.fetching && !ctrl.character"></progress-indicator>

            <social-buttons 
                send-toast="ctrl.sendToast"
                location="{{ ctrl.location }}"></social-buttons>
        `
    };
}

// @ngInject
function CharacterPage ($ngRedux, $stateParams, $scope, $location) {
    let that = this;

    function init () {
        const unsubscribe = $ngRedux.connect(characterViewerSelector)((state) => {
            that.user = state.user;
            that.fetching = state.fetching;
            that.character = state.character;
            that.items = state.items;
            that.skins = state.skins;
            that.fetchingGw2Data = state.fetchingGw2Data;
            that.attributes = state.attributes;
            that.specializations = state.specializations;
            that.fetchingCharacters = state.fetchingCharacters;

            switch (that.mode) {
                case 'public':
                    that.characters = state.users.data[$stateParams.alias] && state.users.data[$stateParams.alias].characters;
                    break;
                
                case 'authenticated':
                    that.characters = state.user.characters;
                    break;
            }

        });

        $scope.$on('$destroy', unsubscribe);

        $scope.$watch(() => {
            return $stateParams.name;
        }, (name) => {
            $ngRedux.dispatch(characterActions.selectCharacter(name));

            if (name) {
                fetchCharacter(name);
            }
        });

        $ngRedux.dispatch(characterActions.selectCharacter($stateParams.name));

        if ($stateParams.name) {
            fetchCharacter($stateParams.name);
        }

        fetchCharacters(that.mode);
    }

    function fetchCharacters (mode) {
        switch (mode) {
            case 'public':
                $ngRedux.dispatch(usersActions.fetchUserCharactersThunk($stateParams.alias));
                that.location = $location.$$absUrl;
                break;

            case 'authenticated':
                $ngRedux.dispatch(userActions.fetchMyCharactersThunk());
                that.location = $location.$$absUrl.replace('me', that.user.alias);
                break;
        }
    }

    function fetchCharacter (name) {
        switch (that.mode) {
            case 'public':
                $ngRedux.dispatch(characterActions.fetchCharacterThunk(name));
                that.location = $location.$$absUrl;
                break;

            case 'authenticated':
                $ngRedux.dispatch(characterActions.fetchCharacterThunk(name, true));
                that.location = $location.$$absUrl.replace('me', that.user.alias);
                break;

            default:
                throw 'Mode not handled';
        }
    }

    function showTooltip (params) {
        const options = {
            item: params.item,
            skin: params.skin,
            upgrades: params.upgrades,
            type: params.type,
            upgradeCount: params.upgradeCount
        };

        $ngRedux.dispatch(gw2Actions.showTooltip(params.show, options));
    }

    function sendToast (message) {
        $ngRedux.dispatch(showToast(message));
    }

    that.fetchCharacter = fetchCharacter;
    that.showTooltip = showTooltip;
    that.sendToast = sendToast;

    init();
}
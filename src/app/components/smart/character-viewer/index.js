'use strict';

import { actionCreators } from '../../../actions/characters';
import * as gw2 from '../../../actions/gw2-data';
import { characterViewerSelector } from '../../../selectors/characters';

import styles from './character-viewer.less';
import portraitStyles from '../../dumb/character-portrait/character-portrait.less';

// TODO: Split this into smaller dumb components !

function component () {
	let directive = {
		restrict: 'E',
		scope: {},
		bindToController: {
			mode: '@'
		},
		controller: CharacterViewer,
		controllerAs: 'ctrl',
		template: `
			<div ng-if="ctrl.selected">
				<!-- TODO: Use character headshot component here! -->
				<div class="${styles.topStrip}">
					<span
						class="${styles.professionIcon}" 
						ng-class="ctrl.professionToClass(ctrl.selected.profession)"></span>

					<div class="${styles.title}">
						<h2 class="${styles.name}">
							{{ ctrl.selected.name }}
						</h2>

						<div class="${styles.subtitle}">
							{{ ctrl.selected.level }}
							{{ ctrl.selected.race }}
							{{ ctrl.selected.profession }}
						</div>

						<div class="${styles.subtitle}">
							<i>{{ ctrl.selected.accountName }}</i>
						</div>
					</div>
				</div>

				<div class="${styles.content}">
					<div class="${styles.infoLeft}">
							<item-block 
								slot-name="Headgear" 
								type="head"
								show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
								fetching="ctrl.fetchingGw2Data"
								icon="{{ ctrl.selected.equipment.helm.skin ? ctrl.skins[ctrl.selected.equipment.helm.skin].icon : ctrl.items[ctrl.selected.equipment.helm.id].icon }}"
								item="ctrl.selected.equipment.helm"></item-block>

							<item-block 
								slot-name="Shoulders" 
								type="shoulder"
								show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
								fetching="ctrl.fetchingGw2Data"
								icon="{{ ctrl.selected.equipment.shoulders.skin ? ctrl.skins[ctrl.selected.equipment.shoulders.skin].icon : ctrl.items[ctrl.selected.equipment.shoulders.id].icon }}"
								item="ctrl.selected.equipment.shoulders"></item-block>

							<item-block 
								slot-name="Chest" 
								type="chest"
								show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
								fetching="ctrl.fetchingGw2Data"
								icon="{{ ctrl.selected.equipment.coat.skin ? ctrl.skins[ctrl.selected.equipment.coat.skin].icon : ctrl.items[ctrl.selected.equipment.coat.id].icon }}"
								item="ctrl.selected.equipment.coat"></item-block>

							<item-block 
								slot-name="Gloves" 
								type="hand"
								show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
								fetching="ctrl.fetchingGw2Data"
								fetching="ctrl.fetchingGw2Data"
								icon="{{ ctrl.selected.equipment.gloves.skin ? ctrl.skins[ctrl.selected.equipment.gloves.skin].icon : ctrl.items[ctrl.selected.equipment.gloves.id].icon }}"
								item="ctrl.selected.equipment.gloves"></item-block>

							<item-block 
								slot-name="Leggings" 
								type="leg"
								show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
								fetching="ctrl.fetchingGw2Data"
								icon="{{ ctrl.selected.equipment.leggings.skin ? ctrl.skins[ctrl.selected.equipment.leggings.skin].icon : ctrl.items[ctrl.selected.equipment.leggings.id].icon }}"
								item="ctrl.selected.equipment.leggings"></item-block>

							<item-block 
								slot-name="Boots" 
								type="feet"
								show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
								fetching="ctrl.fetchingGw2Data"
								icon="{{ ctrl.selected.equipment.boots.skin ? ctrl.skins[ctrl.selected.equipment.boots.skin].icon : ctrl.items[ctrl.selected.equipment.boots.id].icon }}"
								item="ctrl.selected.equipment.boots"></item-block>

							<item-block 
								slot-name="Main-Hand Weapon" 
								type="sword"
								show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
								fetching="ctrl.fetchingGw2Data"
								icon="{{ ctrl.selected.equipment.weaponA1.skin ? ctrl.skins[ctrl.selected.equipment.weaponA1.skin].icon : ctrl.items[ctrl.selected.equipment.weaponA1.id].icon }}"
								item="ctrl.selected.equipment.weaponA1"></item-block>

							<item-block 
								slot-name="Off-Hand Weapon"  
								type="shield"
								show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
								fetching="ctrl.fetchingGw2Data"
								icon="{{ ctrl.selected.equipment.weaponA2.skin ? ctrl.skins[ctrl.selected.equipment.weaponA2.skin].icon : ctrl.items[ctrl.selected.equipment.weaponA2.id].icon }}"
								item="ctrl.selected.equipment.weaponA2"></item-block>

							<item-block 
								slot-name="Main-Hand Weapon" 
								ng-if="ctrl.selected.hasWeaponSwap" 
								type="shield"
								show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
								fetching="ctrl.fetchingGw2Data"
								icon="{{ ctrl.selected.equipment.weaponB1.skin ? ctrl.skins[ctrl.selected.equipment.weaponB1.skin].icon : ctrl.items[ctrl.selected.equipment.weaponB1.id].icon }}"
								item="ctrl.selected.equipment.weaponB1"></item-block>

							<item-block 
								slot-name="Off-Hand Weapon" 
								ng-if="ctrl.selected.hasWeaponSwap" 
								type="sword"
								show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
								fetching="ctrl.fetchingGw2Data"
								icon="{{ ctrl.selected.equipment.weaponB2.skin ? ctrl.skins[ctrl.selected.equipment.weaponB2.skin].icon : ctrl.items[ctrl.selected.equipment.weaponB2.id].icon }}"
								item="ctrl.selected.equipment.weaponB2"></item-block>
						</div>

						<div class="${styles.contentInner}">
							<character-portrait 
									character="ctrl.selected" 
									class="${portraitStyles.container}"></character-portrait>

							<div class="${styles.infoRight}">
								<character-attributes 
									attributes="ctrl.attributes"
									profession="{{ ctrl.selected.profession.toLowerCase() }}"></character-attributes>

								<div class="${styles.equipmentCluster}">
									<item-block 
										slot-name="Back" 
										type="back"
										show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.selected.equipment.backpack.skin ? ctrl.skins[ctrl.selected.equipment.backpack.skin].icon : ctrl.items[ctrl.selected.equipment.backpack.id].icon }}"
										item="ctrl.selected.equipment.backpack"></item-block>

									<item-block 
										slot-name="Accessory" 
										type="beartrinket"
										show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.items[ctrl.selected.equipment.accessory1.id].icon }}"
										item="ctrl.selected.equipment.accessory1"></item-block>

									<item-block 
										slot-name="Accessory" 
										type="cubetrinket"
										show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.items[ctrl.selected.equipment.accessory2.id].icon }}"
										item="ctrl.selected.equipment.accessory2"></item-block>

									<item-block 
										slot-name="Amulet" 
										type="amulet"
										show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.items[ctrl.selected.equipment.amulet.id].icon }}"
										item="ctrl.selected.equipment.amulet"></item-block>

									<item-block 
										slot-name="Ring" 
										type="rightring"
										show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.items[ctrl.selected.equipment.ring1.id].icon }}"
										item="ctrl.selected.equipment.ring1"></item-block>

									<item-block 
										slot-name="Ring" 
										type="leftring"
										show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.items[ctrl.selected.equipment.ring2.id].icon }}"
										item="ctrl.selected.equipment.ring2"></item-block>

									<item-block 
										slot-name="Foraging" 
										type="sickle"
										show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.items[ctrl.selected.equipment.sickle.id].icon }}"
										item="ctrl.selected.equipment.sickle"></item-block>

									<item-block 
										slot-name="Logging" 
										type="axe"
										show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.items[ctrl.selected.equipment.axe.id].icon }}"
										item="ctrl.selected.equipment.axe"></item-block>

									<item-block 
										slot-name="Mining" 
										type="pick"
										show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.items[ctrl.selected.equipment.pick.id].icon }}"
										item="ctrl.selected.equipment.pick"></item-block>

									<item-block 
										slot-name="Acquatic Headgear" 
										type="head"
										show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.selected.equipment.helmAquatic.skin ? ctrl.skins[ctrl.selected.equipment.helmAquatic.skin].icon : ctrl.items[ctrl.selected.equipment.helmAquatic.id].icon }}"
										item="ctrl.selected.equipment.helmAquatic"></item-block>

									<item-block 
										slot-name="Acquatic Weapon" 
										type="sword"
										show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.selected.equipment.weaponAquaticA.skin ? ctrl.skins[ctrl.selected.equipment.weaponAquaticA.skin].icon : ctrl.items[ctrl.selected.equipment.weaponAquaticA.id].icon }}"
										item="ctrl.selected.equipment.weaponAquaticA"></item-block>

									<item-block 
										slot-name="Acquatic Weapon" 
										ng-if="ctrl.hasWeaponSwap" 
										type="sword"
										show-tooltip="ctrl.showTooltip(show, item, skin, upgrades, type, upgradeCount)"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.selected.equipment.weaponAquaticB.skin ? ctrl.skins[ctrl.selected.equipment.weaponAquaticB.skin].icon : ctrl.items[ctrl.selected.equipment.weaponAquaticB.id].icon }}"
									item="ctrl.selected.equipment.weaponAquaticB"></item-block>
								</div>
								
								<crafting-block 
									ng-repeat="model in ctrl.selected.crafting" 
									model="model"></crafting-block>
							</div>
					</div>
				</div>

				<div class="${styles.brushStrokeContainer}" ng-if="ctrl.specializations[0]">
					<character-specialization 
						ng-repeat="spec in ctrl.specializations"
						specialization="spec.id"
						traits="spec.traits"></character-specialization>
				</div>
			</div>

			<progress-indicator 
				class="centered"	
				busy="ctrl.fetching"></progress-indicator>

			<item-tooltip></item-tooltip>
		`
	};

	return directive;
}

class CharacterViewer {
	// @ngInject
	constructor ($stateParams, $scope, $ngRedux) {
		this.$ngRedux = $ngRedux;

		const unsubscribe = $ngRedux.connect(characterViewerSelector)(this);
		$scope.$on('$destroy', unsubscribe);
		$scope.$watch(() => {
			return $stateParams.name;
		}, (name) => {
			if (name) {
				$ngRedux.dispatch(actionCreators.fetchCharacterThunk(name));
			}

			$ngRedux.dispatch(actionCreators.selectCharacter(name));
		});
	}

	professionToClass (profession) {
		return styles[profession.toLowerCase()];
	}

	showTooltip (show, item, skin, upgrades, type, totalUpgrades) {
		const options = {
			item,
			skin,
			upgrades,
			type,
			totalUpgrades
		};

		this.$ngRedux.dispatch(gw2.actionCreators.showTooltip(show, options));
	}
}

export default component;
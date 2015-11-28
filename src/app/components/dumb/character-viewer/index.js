'use strict';

import { actionCreators } from '../../../actions/characters';
import * as gw2 from '../../../actions/gw2-data';
import { characterViewerSelector } from '../../../selectors/characters';

import styles from './character-viewer.less';
import portraitStyles from '../../dumb/character-portrait/character-portrait.less';
import containerStyles from '../../../styles/container/container.less';
import positionStyles from '../../../styles/positioning/positioning.less';

function component () {
	let directive = {
		restrict: 'E',
		scope: {},
		bindToController: {
			alias: '@',
			mode: '@',
			character: '=',
			fetchingGw2Data: '=',
			showTooltip: '&',
			items: '=',
			skins: '=',
			attributes: '=',
			specializations: '='
		},
		controller: CharacterViewer,
		controllerAs: 'ctrl',
		template: `
			<!-- TODO: Use character headshot component here! -->
			<div class="${containerStyles.flexContainer} ${styles.container}">
				<div class="${styles.topStrip}">
					<span
						class="${styles.professionIcon}" 
						ng-class="ctrl.professionToClass(ctrl.character.profession)"></span>

					<div class="${styles.title}">
						<h2 class="${styles.name}">
							<a 
								title="View {{ ctrl.character.guild_name }}"
								ng-href="/#!/g/{{ ctrl.character.guild_name }}"
								ng-if="ctrl.character.guild"><i>[{{ ctrl.character.guild_tag }}] </i></a>
							{{ ctrl.character.name }}
						</h2>

						<div class="${styles.subtitle}">
							{{ ctrl.character.level }}
							{{ ctrl.character.race }}
							{{ ctrl.character.profession }}
						</div>

						<div class="${styles.subtitle}">
							<a ng-href="/#!/{{ ctrl.character.alias }}"><i>{{ ctrl.character.accountName }}</i></a>
						</div>
					</div>
				</div>

				<div class="${styles.content}">
					<div class="${styles.infoLeft}">
							<item-block 
								slot-name="Headgear" 
								type="head"
								show-tooltip="ctrl.showTooltip"
								fetching="ctrl.fetchingGw2Data"
								icon="{{ ctrl.character.equipment.helm.skin ? ctrl.skins[ctrl.character.equipment.helm.skin].icon : ctrl.items[ctrl.character.equipment.helm.id].icon }}"
								item="ctrl.character.equipment.helm"></item-block>

							<item-block 
								slot-name="Shoulders" 
								type="shoulder"
								show-tooltip="ctrl.showTooltip"
								fetching="ctrl.fetchingGw2Data"
								icon="{{ ctrl.character.equipment.shoulders.skin ? ctrl.skins[ctrl.character.equipment.shoulders.skin].icon : ctrl.items[ctrl.character.equipment.shoulders.id].icon }}"
								item="ctrl.character.equipment.shoulders"></item-block>

							<item-block 
								slot-name="Chest" 
								type="chest"
								show-tooltip="ctrl.showTooltip"
								fetching="ctrl.fetchingGw2Data"
								icon="{{ ctrl.character.equipment.coat.skin ? ctrl.skins[ctrl.character.equipment.coat.skin].icon : ctrl.items[ctrl.character.equipment.coat.id].icon }}"
								item="ctrl.character.equipment.coat"></item-block>

							<item-block 
								slot-name="Gloves" 
								type="hand"
								show-tooltip="ctrl.showTooltip"
								fetching="ctrl.fetchingGw2Data"
								fetching="ctrl.fetchingGw2Data"
								icon="{{ ctrl.character.equipment.gloves.skin ? ctrl.skins[ctrl.character.equipment.gloves.skin].icon : ctrl.items[ctrl.character.equipment.gloves.id].icon }}"
								item="ctrl.character.equipment.gloves"></item-block>

							<item-block 
								slot-name="Leggings" 
								type="leg"
								show-tooltip="ctrl.showTooltip"
								fetching="ctrl.fetchingGw2Data"
								icon="{{ ctrl.character.equipment.leggings.skin ? ctrl.skins[ctrl.character.equipment.leggings.skin].icon : ctrl.items[ctrl.character.equipment.leggings.id].icon }}"
								item="ctrl.character.equipment.leggings"></item-block>

							<item-block 
								slot-name="Boots" 
								type="feet"
								show-tooltip="ctrl.showTooltip"
								fetching="ctrl.fetchingGw2Data"
								icon="{{ ctrl.character.equipment.boots.skin ? ctrl.skins[ctrl.character.equipment.boots.skin].icon : ctrl.items[ctrl.character.equipment.boots.id].icon }}"
								item="ctrl.character.equipment.boots"></item-block>

							<item-block 
								slot-name="Main-Hand Weapon" 
								type="sword"
								show-tooltip="ctrl.showTooltip"
								fetching="ctrl.fetchingGw2Data"
								icon="{{ ctrl.character.equipment.weaponA1.skin ? ctrl.skins[ctrl.character.equipment.weaponA1.skin].icon : ctrl.items[ctrl.character.equipment.weaponA1.id].icon }}"
								item="ctrl.character.equipment.weaponA1"></item-block>

							<item-block 
								slot-name="Off-Hand Weapon"  
								type="shield"
								show-tooltip="ctrl.showTooltip"
								fetching="ctrl.fetchingGw2Data"
								icon="{{ ctrl.character.equipment.weaponA2.skin ? ctrl.skins[ctrl.character.equipment.weaponA2.skin].icon : ctrl.items[ctrl.character.equipment.weaponA2.id].icon }}"
								item="ctrl.character.equipment.weaponA2"></item-block>

							<item-block 
								slot-name="Main-Hand Weapon" 
								ng-if="ctrl.character.hasWeaponSwap" 
								type="shield"
								show-tooltip="ctrl.showTooltip"
								fetching="ctrl.fetchingGw2Data"
								icon="{{ ctrl.character.equipment.weaponB1.skin ? ctrl.skins[ctrl.character.equipment.weaponB1.skin].icon : ctrl.items[ctrl.character.equipment.weaponB1.id].icon }}"
								item="ctrl.character.equipment.weaponB1"></item-block>

							<item-block 
								slot-name="Off-Hand Weapon" 
								ng-if="ctrl.character.hasWeaponSwap" 
								type="sword"
								show-tooltip="ctrl.showTooltip"
								fetching="ctrl.fetchingGw2Data"
								icon="{{ ctrl.character.equipment.weaponB2.skin ? ctrl.skins[ctrl.character.equipment.weaponB2.skin].icon : ctrl.items[ctrl.character.equipment.weaponB2.id].icon }}"
								item="ctrl.character.equipment.weaponB2"></item-block>
						</div>

						<div class="${styles.contentInner}">
							<character-portrait 
									character="ctrl.character" 
									class="${portraitStyles.container}"></character-portrait>

							<div class="${styles.infoRight}">
								<character-attributes
									show-tooltip="ctrl.showTooltip"
									attributes="ctrl.attributes"
									profession="{{ ctrl.character.profession.toLowerCase() }}"></character-attributes>

								<div class="${styles.equipmentCluster}">
									<item-block 
										slot-name="Back" 
										type="back"
										show-tooltip="ctrl.showTooltip"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.character.equipment.backpack.skin ? ctrl.skins[ctrl.character.equipment.backpack.skin].icon : ctrl.items[ctrl.character.equipment.backpack.id].icon }}"
										item="ctrl.character.equipment.backpack"></item-block>

									<item-block 
										slot-name="Accessory" 
										type="beartrinket"
										show-tooltip="ctrl.showTooltip"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.items[ctrl.character.equipment.accessory1.id].icon }}"
										item="ctrl.character.equipment.accessory1"></item-block>

									<item-block 
										slot-name="Accessory" 
										type="cubetrinket"
										show-tooltip="ctrl.showTooltip"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.items[ctrl.character.equipment.accessory2.id].icon }}"
										item="ctrl.character.equipment.accessory2"></item-block>

									<item-block 
										slot-name="Amulet" 
										type="amulet"
										show-tooltip="ctrl.showTooltip"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.items[ctrl.character.equipment.amulet.id].icon }}"
										item="ctrl.character.equipment.amulet"></item-block>

									<item-block 
										slot-name="Ring" 
										type="rightring"
										show-tooltip="ctrl.showTooltip"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.items[ctrl.character.equipment.ring1.id].icon }}"
										item="ctrl.character.equipment.ring1"></item-block>

									<item-block 
										slot-name="Ring" 
										type="leftring"
										show-tooltip="ctrl.showTooltip"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.items[ctrl.character.equipment.ring2.id].icon }}"
										item="ctrl.character.equipment.ring2"></item-block>

									<item-block 
										slot-name="Foraging" 
										type="sickle"
										show-tooltip="ctrl.showTooltip"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.items[ctrl.character.equipment.sickle.id].icon }}"
										item="ctrl.character.equipment.sickle"></item-block>

									<item-block 
										slot-name="Logging" 
										type="axe"
										show-tooltip="ctrl.showTooltip"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.items[ctrl.character.equipment.axe.id].icon }}"
										item="ctrl.character.equipment.axe"></item-block>

									<item-block 
										slot-name="Mining" 
										type="pick"
										show-tooltip="ctrl.showTooltip"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.items[ctrl.character.equipment.pick.id].icon }}"
										item="ctrl.character.equipment.pick"></item-block>

									<item-block 
										slot-name="Acquatic Headgear" 
										type="head"
										show-tooltip="ctrl.showTooltip"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.character.equipment.helmAquatic.skin ? ctrl.skins[ctrl.character.equipment.helmAquatic.skin].icon : ctrl.items[ctrl.character.equipment.helmAquatic.id].icon }}"
										item="ctrl.character.equipment.helmAquatic"></item-block>

									<item-block 
										slot-name="Acquatic Weapon" 
										type="sword"
										show-tooltip="ctrl.showTooltip"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.character.equipment.weaponAquaticA.skin ? ctrl.skins[ctrl.character.equipment.weaponAquaticA.skin].icon : ctrl.items[ctrl.character.equipment.weaponAquaticA.id].icon }}"
										item="ctrl.character.equipment.weaponAquaticA"></item-block>

									<item-block 
										slot-name="Acquatic Weapon" 
										ng-if="ctrl.hasWeaponSwap" 
										type="sword"
										show-tooltip="ctrl.showTooltip"
										fetching="ctrl.fetchingGw2Data"
										icon="{{ ctrl.character.equipment.weaponAquaticB.skin ? ctrl.skins[ctrl.character.equipment.weaponAquaticB.skin].icon : ctrl.items[ctrl.character.equipment.weaponAquaticB.id].icon }}"
									item="ctrl.character.equipment.weaponAquaticB"></item-block>
								</div>
								
								<crafting-block
									show-tooltip="ctrl.showTooltip"
									ng-repeat="model in ctrl.character.crafting" 
									model="model"></crafting-block>
							</div>
					</div>
				</div>

				<div 
					class="${styles.emptySpecializationSpacer}"
					ng-if="!ctrl.specializations[0]"></div>

				<div class="${styles.specializationContainer}">
					<div class="${styles.brushStrokeContainer}" ng-if="ctrl.specializations[0]">
						<character-specialization 
							ng-repeat="spec in ctrl.specializations"
							specialization="spec.id"
							traits="spec.traits"></character-specialization>
					</div>
				</div>
			</div>

			<div class="${positionStyles.textCenter} ${styles.avatarContainer}">
				<avatar
					ng-if="ctrl.character.guild"
					name="{{ ctrl.character.guild_name + ' [' + ctrl.character.guild_tag + ']' }}"
					link="/#!/g/{{ ctrl.character.guild_name }}"
					image-location="https://guilds.gw2w2w.com/guilds/{{ ctrl.character.guild_name }}/256.svg"></avatar>

				<avatar
					name="{{ ctrl.character.alias }}"
					link="/#!/{{ ctrl.character.alias }}"
					image-location="http://api.adorable.io/avatars/200/{{ ctrl.character.alias }}.png"></avatar>
			</div>
		`
	};

	return directive;
}

class CharacterViewer {
	constructor () {
		// Passing down functions never was so hard:
		// http://stackoverflow.com/questions/19889615/can-an-angular-directive-pass-arguments-to-functions-in-expressions-specified-in
		this.showTooltip = this.showTooltip();
	}

	professionToClass (profession) {
		return styles[profession.toLowerCase()];
	}
}

export default component;
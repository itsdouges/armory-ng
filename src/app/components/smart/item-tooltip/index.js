'use strict';

import styles from './item-tooltip.less';
import colours from '../../../styles/variables/colours.less';
import iconStyles from '../../../styles/icons/icons.less';
import position from '../../../styles/positioning/positioning.less';
import { tooltipSelector } from '../../../selectors/gw2-data';

function component () {
    let directive = {
        restrict: 'E',
        controller: ItemTooltip,
        controllerAs: 'ctrl',
        scope: {},
        template: `
            <div 
                ng-if="ctrl.tooltip.open"
                mouse-follow
                class="${styles.container} ${styles.containerDefault}">
                <div ng-if="!ctrl.fetching">
                    <i class="${styles.itemPreHeader}">
                        {{ ctrl.typeName }}
                    </i>

                    <div ng-if="ctrl.item">
                        <div class="${styles.itemHeader}">
                            <span class="${iconStyles.icon} ${iconStyles.mini} ${styles.tooltipIcon}" style="background-image: url('{{ ctrl.item.icon }}')"></span>

                            <span class="${styles.itemName}" ng-class="ctrl.getRarityStyle(ctrl.item.rarity)">
                                {{ ctrl.item.name }}
                            </span>
                        </div>

                        <div>
                            <div ng-if="ctrl.item.details.defense">
                                Defense: <span class="${colours.green}">{{ ctrl.item.details.defense }}</span>
                            </div>

                            <div ng-if="ctrl.item.type === 'Weapon'">
                                <span>Weapon Strength:</span>
                                <span class="${colours.green}">{{ ctrl.item.details.min_power }} - {{ ctrl.item.details.max_power }}</span>
                            </div>
                            
                            <!-- todo: parse some values that are one word into do (i.e. conditiondamage -> condition damage) -->
                            <div class="${colours.green}" ng-repeat="infix in ctrl.item.details.infix_upgrade.attributes">
                                {{ '+' + infix.modifier + ' ' + infix.attribute }}
                            </div>

                            <upgrade-component ng-if="ctrl.item.has_slot_one" upgrade="ctrl.item.details.upgrade_one"></upgrade-component>

                            <upgrade-component ng-if="ctrl.item.has_slot_two" upgrade="ctrl.item.details.upgrade_two"></upgrade-component>

                            <div class="${styles.tooltipGap}"></div>

                            <div>
                                <div ng-if="ctrl.item.original_name">Transmuted</div>

                                <!-- todo: if account owned skins is released make this update if the user is logged in -->
                                <div ng-if="!ctrl.item.original_name">Skin Locked</div>
                                {{ ctrl.item.original_name || ctrl.item.name }}
                            </div>
                        </div>

                        <div class="${styles.tooltipGap}"></div>

                        <div>
                            <div>{{ ctrl.item.rarity }}</div>
                            
                            <div>{{ ctrl.item.details.weight_class }}</div>
                            
                            <div>{{ ctrl.item.details.type }} {{ ctrl.item.type }}</div>
                            
                            <div>{{ ctrl.item.description }}</div>
                            
                            <div ng-if="ctrl.item.level">
                                {{ 'Required Level: ' + ctrl.item.level }}
                            </div>

                            <div>{{ ctrl.item.boundStatus }}</div>

                            <!-- TODO: Replace with flexbox instead of position absolute -->

                            <div class="${styles.costContainer}">
                                <span class="${colours.gold}" ng-if="ctrl.item.gold">
                                    {{ ctrl.item.gold }}
                                    <span class="${iconStyles.icon} ${iconStyles.micro} ${iconStyles.gold} ${position.sticky} ${position.bottom}"></span>
                                    <span class="${iconStyles.icon} ${iconStyles.micro}"></span>
                                </span>

                                <span class="${colours.silver}" ng-if="ctrl.item.silver">
                                    {{ ctrl.item.silver }}
                                    <span class="${iconStyles.icon} ${iconStyles.micro} ${iconStyles.silver} ${position.sticky} ${position.bottom}"></span>
                                    <span class="${iconStyles.icon} ${iconStyles.micro}"></span>
                                </span>

                                <span class="${colours.copper}" ng-if="ctrl.item.copper">
                                    {{ ctrl.item.copper }}
                                    <span class="${iconStyles.icon} ${iconStyles.micro} ${iconStyles.copper} ${position.sticky} ${position.bottom}"></span>
                                    <span class="${iconStyles.icon} ${iconStyles.micro}"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <progress-indicator [busy]="ctrl.fetching"></progress-indicator>
            </div>
        `
    };

    return directive;
}

class ItemTooltip {
    // @ngInject
    constructor ($ngRedux, $scope) {
        const unsubscribe = $ngRedux.connect(tooltipSelector)(this);
        $scope.$on('$destroy', unsubscribe);
    }

    getRarityStyle (rarity) {
        return colours[rarity.toLowerCase()];
    }
}

export default component;
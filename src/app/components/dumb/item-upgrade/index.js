'use strict';

import tooltipStyles from '../../smart/item-tooltip/item-tooltip.less';
import colours from '../../../styles/variables/colours.less';
import iconStyles from '../../../styles/icons/icons.less';

function component () {
    let directive = {
        restrict: 'E',
        template: `
            <div ng-if="ctrl.hasUpgrade">
                <div class="${tooltipStyles.tooltipGap}"></div>

                <div class="${colours.blue}">
                    <span class="${iconStyles.icon} ${iconStyles.micro}" style="background-image: url('{{ ctrl.upgrade.icon }}')"></span>

                    <span>{{ ctrl.upgrade.name }}</span>

                    <span ng-if="ctrl.hasBonuses">
                        {{ '(' + ctrl.upgrade.upgrade_combo_count + '/' + ctrl.upgrade.details.bonuses.length + ')' }}
                    </span>
                </div>

                <div ng-if="ctrl.hasBonuses">
                    <div ng-repeat="(key, bonus) in ctrl.upgrade.details.bonuses">
                        <span ng-class="{ '${colours.blue}': key < ctrl.upgrade.upgrade_combo_count }">
                            {{ '(' + (key + 1) + '): ' + bonus }}
                        </span>
                    </div>
                </div>

                <div ng-if="ctrl.hasBuffs">
                    <div class="${colours.blue}" ng-repeat="buff in ctrl.upgrade.details.infix_upgrade.buff.description">
                        {{ buff }}
                    </div>
                </div>
            </div>

            <div ng-if="!ctrl.hasUpgrade">
                <div class="${tooltipStyles.tooltipGap}"></div>

                <span class="${iconStyles.icon} ${iconStyles.micro} ${iconStyles.upgrade}"></span>
                <span>Unused Upgrade Slot</span>
            </div>
        `,
        controller: ItemUpgrade,
        controllerAs: 'ctrl',
        scope: {},
        bindToController: {
            upgrade: '='
        }
    };

    return directive;
}

// TODO: Move logic into higher component
class ItemUpgrade {
    constructor () {
        this.hasUpgrade = !!this.upgrade;

        if (this.hasUpgrade) {
            this.hasBonuses = !!this.upgrade.details.bonuses;
            this.hasBuffs = !!this.upgrade.details.infix_upgrade.buff;
        }
    }
}

export default component;
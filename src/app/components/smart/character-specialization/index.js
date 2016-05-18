import { traitsSelector } from '../../../selectors/characters';
import gw2Actions from '../../../actions/gw2-data';

import styles from './character-specialization.less';

function component () {
    let directive = {
        restrict: 'E',
        scope: {},
        bindToController: {
            specialization: '=',
            traits: '='
        },
        controller: CharacterSpecialization,
        controllerAs: 'ctrl',
        template: `
            <!-- TODO: Move traits into separate dumb component -->
            <!-- Calculate minor trait based on character level -->
            <!-- Contemplate making this component into a dumb component -->

            <div 
                class="${styles.specializationBg}" 
                style="background-image: url('{{ ctrl.gw2Specializations[ctrl.specialization].background }}');">
            </div>

            <div
                ng-mouseenter="ctrl.showTooltip({ show: true, type: ctrl.gw2Specializations[ctrl.specialization].name })"
                ng-mouseleave="ctrl.showTooltip({ show: false })"
                class="${styles.specializationIcon}" 
                style="background-image: url('{{ ctrl.gw2Specializations[ctrl.specialization].background }}');">
                <div class="${styles.specializationIconTop}"></div>
                <div class="${styles.specializationIconBottom}"></div>
            </div>

            <specialization-trait
                active="true"
                show-tooltip="ctrl.showTooltip"
                class="${styles.minorTraitColumn}" 
                trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].minor_traits[0]]"></specialization-trait>

            <div class="${styles.majorTraitColumn}">
                <specialization-trait
                    show-tooltip="ctrl.showTooltip"
                    active="ctrl.isActive(ctrl.traits.indexOf(ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[0]].id))"
                    trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[0]]"></specialization-trait>

                <specialization-trait
                    show-tooltip="ctrl.showTooltip"
                    active="ctrl.isActive(ctrl.traits.indexOf(ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[1]].id))"
                    trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[1]]"></specialization-trait>

                <specialization-trait
                    show-tooltip="ctrl.showTooltip"
                    active="ctrl.isActive(ctrl.traits.indexOf(ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[2]].id))"
                    trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[2]]"></specialization-trait>
            </div>

            <specialization-trait
                show-tooltip="ctrl.showTooltip"
                active="true"
                class="${styles.minorTraitColumn}" 
                trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].minor_traits[1]]"></specialization-trait>

            <div class="${styles.majorTraitColumn}">
                <specialization-trait
                    show-tooltip="ctrl.showTooltip"
                    active="ctrl.isActive(ctrl.traits.indexOf(ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[3]].id))"
                    trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[3]]"></specialization-trait>

                <specialization-trait
                    show-tooltip="ctrl.showTooltip"
                    active="ctrl.isActive(ctrl.traits.indexOf(ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[4]].id))"
                    trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[4]]"></specialization-trait>

                <specialization-trait
                    show-tooltip="ctrl.showTooltip"
                    active="ctrl.isActive(ctrl.traits.indexOf(ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[5]].id))"
                    trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[5]]"></specialization-trait>
            </div>

            <specialization-trait
                show-tooltip="ctrl.showTooltip"
                active="true"
                class="${styles.minorTraitColumn}" 
                trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].minor_traits[2]]"></specialization-trait>

            <div class="${styles.majorTraitColumn}">
                <specialization-trait
                    show-tooltip="ctrl.showTooltip"
                    active="ctrl.isActive(ctrl.traits.indexOf(ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[6]].id))"
                    trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[6]]"></specialization-trait>

                <specialization-trait
                    show-tooltip="ctrl.showTooltip"
                    active="ctrl.isActive(ctrl.traits.indexOf(ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[7]].id))"
                    trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[7]]"></specialization-trait>

                <specialization-trait
                    show-tooltip="ctrl.showTooltip"
                    active="ctrl.isActive(ctrl.traits.indexOf(ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[8]].id))"
                    trait="ctrl.gw2Traits[ctrl.gw2Specializations[ctrl.specialization].major_traits[8]]"></specialization-trait>
            </div>
        `
    };

    return directive;
}

// @ngInject
function CharacterSpecialization ($ngRedux, $scope) {
    let that = this;

    function init () {
        const unsubscribe = $ngRedux.connect(traitsSelector)(that);
        $scope.$on('$destroy', unsubscribe);
    }

    that.isActive = (found) => {
        if (found > -1) {
            return 'active';
        }
    }

    that.showTooltip = (params) => {
        const options = {
            item: params.item,
            skin: params.skin,
            upgrades: params.upgrades,
            type: params.type,
            upgradeCount: params.upgradeCount
        };

        $ngRedux.dispatch(gw2Actions.showTooltip(params.show, options));
    }

    init();
}

export default component;
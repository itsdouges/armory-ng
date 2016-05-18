'use strict';

import styles from './slider-control.less';

function component () {
    let directive = {
        restrict: 'E',
        controller: SliderControl,
        controllerAs: 'ctrl',
        scope: {},
        bindToController: {
            mode: '@'
        },
        template: `
            <a
                href=""
                class="${styles.sliderControl}" 
                ng-class="ctrl.mode === 'left' ? '${styles.left}' : '${styles.right}'">
                <span>{{ ctrl.mode }}</span>
                <i class="fa fa-angle-{{ ctrl.mode }}"></i>
            </a>
        `
    };

    return directive;
}

class SliderControl {

}

export default component;
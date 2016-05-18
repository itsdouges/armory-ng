'use strict';

// NB: THESE SIZES ARE DUPLICATED FROM SIZES.LESS, MAKE SURE THEYRE IN SYNC!
const BIG_PC_WIDTH = 1300;
const PC_WIDTH = 1024;
const TABLET_WIDTH = 700;
const PHONE_WIDTH = 480;

import { actionCreators } from '../../actions/window';

// @ngInject
function ColumnsCalculatorDirective ($window, debounce, $ngRedux) {
    let currentSize;

    let link = (scope) => {
        let resizeEvent = () => {
            let windowWidth = $window.innerWidth;
            let columnSize;
            
            if (windowWidth <= PHONE_WIDTH) {
                columnSize = 1;
            } else if (windowWidth <= TABLET_WIDTH) {
                columnSize = 2;
            } else if (windowWidth <= PC_WIDTH) {
                columnSize = 3;
            } else if (windowWidth <= BIG_PC_WIDTH) {
                columnSize = 4;
            } else {
                columnSize = 5;
            }

            if (columnSize !== currentSize) {
                currentSize = columnSize;
                $ngRedux.dispatch(actionCreators.setColumnSize(columnSize));
            }
        };

        let debounceResize = debounce.func(resizeEvent, 200);
        $window.addEventListener('resize', debounceResize, false);

        scope.$on('$destroy', () => {
            $window.removeEventListener('resize', debounceResize);
        });

        resizeEvent();
    };

    let directive = {
        restrict: 'A',
        scope: {},
        link: link
    };

    return directive;
}

export default ColumnsCalculatorDirective;
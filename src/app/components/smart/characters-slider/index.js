'use strict';

import usersActions from '../../../actions/users';
import { actionCreators } from '../../../actions/user/characters';
import { myCharactersSelector } from '../../../selectors/characters';

import styles from './characters-slider.less';

// TODO: Clean this up and do some unit tests. Shit is nasty! Probably remake it.

// @ngInject
function component ($window, debounce) {
    let link = (scope, element, attrs, controller) => {
        let inlineCharactersElement = element.find('inline-characters')[0],
            transitionEvent;

        let scopeEvent = (e, cb) => {
            transitionEvent = (e) => {
                if (e.propertyName === 'transform') {
                    cb();
                }
                
                return true;
            };

            // TODO: Minimize anti-dry.
            inlineCharactersElement.addEventListener('transitionend', transitionEvent, false);
            inlineCharactersElement.addEventListener('otransitionend', transitionEvent, false);
            inlineCharactersElement.addEventListener('oTransitionEnd', transitionEvent, false);
            inlineCharactersElement.addEventListener('webkitTransitionEnd', transitionEvent, false);
        };

        scope.$on('slider:set-transition-end-event', scopeEvent);
        scope.$on('$destroy', () => {
            // TODO: Minimize anti-dry.
            inlineCharactersElement.removeEventListener('transitionend', transitionEvent);
            inlineCharactersElement.removeEventListener('otransitionend', transitionEvent);
            inlineCharactersElement.removeEventListener('oTransitionEnd', transitionEvent);
            inlineCharactersElement.removeEventListener('webkitTransitionEnd', transitionEvent);
        });
    };

    let directive = {
        restrict: 'E',
        controller: CharactersSlider,
        controllerAs: 'ctrl',
        scope: {},
        bindToController: {
            mode: '@'
        },
        link: link,
        template: `
            <div class="${styles.borderContainer} ${styles.borderContainerTop}">
                <div class="${styles.border} ${styles.borderTopLeft}"></div>
                <div class="${styles.border} ${styles.borderTopRight}"></div>
            </div>

            <div class="${styles.container}">
                <slider-control
                    mode="left"
                    ng-if="!ctrl.sliderControlsDisabled"
                    ng-click="ctrl.previous()"></slider-control>

                <div 
                    class="${styles.sliderMessage}" 
                    ng-if="!ctrl.hasCharacters">
                    <span ng-if="ctrl.mode === 'public'">Oh, he has no characters.. :(</span>
                    <span ng-if="ctrl.mode === 'authenticated'">Oh, you have no characters.. why not <a ui-sref="main.with-auth.with-container.settings"><strong>add a few api tokens</strong></a> to your account?</span>
                </div>

                <inline-characters
                    ng-show="ctrl.hasCharacters" 
                    ng-style="ctrl.sliderStyle"
                    characters="ctrl.characters"></inline-characters>

                <slider-control
                    mode="right"
                    ng-if="!ctrl.sliderControlsDisabled"
                    ng-click="ctrl.next()"></slider-control>
            </div>

            <div class="${styles.borderContainer} ${styles.borderContainerBottom}">
                <div class="${styles.border} ${styles.borderBottomLeft}"></div>
                <div class="${styles.border} ${styles.borderBottomRight}"></div>
            </div>
        `
    };

    return directive;
}

// @ngInject
export function CharactersSlider ($scope, $ngRedux, $stateParams) {
    const SLIDER_TRANSLATE_PERCENTAGE = 100;

    let scope = this,
        characters,
        transitionDirection,
        sliderItemsPerPage,
        currentPosition,
        loaded = false,
        SLIDER_ITEMS_TOTAL;

    // this.hasCharacters = function () {
    //  return this.characters && this.characters.length;
    // }

    function init () {
        scope.sliderControlsDisabled = true;

        // TODO: This can be put behind a selector! (() => {}) instead of (this)
        const unsubscribe = $ngRedux.subscribe(() => {
            const state = $ngRedux.getState();
            const selector = myCharactersSelector(state);

            if (!selector.characters || !selector.characters.length) {
                return;
            }

            if (!loaded) {
                characters = selector.characters;
                scope.hasCharacters = selector.hasCharacters;
            }

            initializeSlider(selector.columns);
        });

        $scope.$on('$destroy', unsubscribe);

        switch(scope.mode) {
            case 'authenticated':
                $ngRedux.dispatch(actionCreators.fetchMyCharactersThunk());
                break;

            case 'public':
                $ngRedux.dispatch(usersActions.fetchUserCharactersThunk($stateParams.alias));
                break;

            default:
                console.error('Mode not supported for slider');
                break;
        }

        setSliderStyle(SLIDER_TRANSLATE_PERCENTAGE);
    }

    function initializeSlider (newSliderItemsPerPage) {
        if (!loaded && characters.length > newSliderItemsPerPage) {
            scope.sliderControlsDisabled = false;
        }

        if (!loaded && characters.length <= newSliderItemsPerPage) {
            setSliderStyle(0);
            scope.characters = characters;
        } else if (!loaded || sliderItemsPerPage !== newSliderItemsPerPage && !scope.sliderControlsDisabled) {
            sliderItemsPerPage = newSliderItemsPerPage;
            SLIDER_ITEMS_TOTAL = sliderItemsPerPage * 3;

            while (characters.length < SLIDER_ITEMS_TOTAL) {
                characters = characters.concat(characters);
            }

            setCharactersOffset(sliderItemsPerPage, SLIDER_ITEMS_TOTAL);
        }

        if (!loaded) {
            $scope.$emit('slider:set-transition-end-event', () => {
                $scope.$apply(() => {
                    let offset;

                    if (transitionDirection === 'previous') {
                        offset = sliderItemsPerPage;
                    } else if (transitionDirection === 'next') {
                        offset = -sliderItemsPerPage;
                    } else {
                        console.error('transition not handled');
                    }

                    setCharactersOffset(offset);
                });

                requestAnimationFrame(() => {
                    $scope.$apply(() => {
                        setSliderStyle(SLIDER_TRANSLATE_PERCENTAGE, true);
                    });
                });
            });

            loaded = true;
        }
    }

    function setCharactersOffset (offset, maxItems) {
        var tempc,
            i;

        if (offset >= 0) {
            tempc = characters;

            for(i = 0; i < offset; i++) {
                tempc.unshift(tempc.pop());
            }
        } else {
            tempc = characters;
            offset *= -1;
            
            for(i = 0; i < offset; i++) {
                tempc.push(tempc.shift());
            }
        }

        scope.characters = tempc.slice(0, maxItems);
    }

    function setSliderStyle (translateX, noTransition) {
        let style = {
            transform: `translate3d(-${translateX}%, 0, 0)`,
            'webkit-transform': `translate3d(-${translateX}%, 0, 0)`
        };

        if (noTransition) {
            style.transition = 'inherit';
        }

        scope.sliderStyle = style;
    }

    this.next = () => {
        transitionDirection = 'next';
        setSliderStyle(SLIDER_TRANSLATE_PERCENTAGE * 2);
    };

    this.previous = () => {
        transitionDirection = 'previous';
        setSliderStyle(0);
    };

    init();
}

export default component;
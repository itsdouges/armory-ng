'use strict';

import { actionCreators } from '../../../actions/user';
import { userDataSelector } from '../../../selectors/user';

import styles from './change-alias.less';
import inputStyles from '../../../styles/forms/forms.less';

function component () {
    let directive = {
        restrict: 'E',
        controller: ChangeAlias,
        controllerAs: 'ctrl',
        scope: {},
        template: `
            <form>
                    <div class="${inputStyles.inputContainer}">
                    <input placeholder="Alias" ng-change="ctrl.checkAlias()" id="add-token" type="text" ng-model="ctrl.user.alias" required="required" />

                    <input-validity
                        data-busy="ctrl.busy"
                        data-valid="ctrl.token.valid">
                    </input-validity>
                </div>

                <div class="${inputStyles.buttonGroup}">
                    <busy-button button-disabled="!ctrl.user.validAlias" busy="ctrl.user.savingAlias">
                        <i class="fa fa-floppy-o"></i>
                    </busy-button>
                </div>
            </form>
        `
    };

    return directive;
}

// @ngInject
function ChangeAlias ($ngRedux, $scope, debounce) {
    let scope = this;

    const unsubscribe = $ngRedux.connect(userDataSelector)(this);
    $scope.$on('$destroy', unsubscribe);

    var checkAliasDebounce;
    this.checkAlias = () => {
        if (scope.user.aliasValid) {
            $ngRedux.dispatch(actionCreators.invalidateAlias());
        }

        checkAliasDebounce = checkAliasDebounce || debounce.func(() => {
            $ngRedux.dispatch(actionCreators.checkAliasThunk(scope.user.alias));
        });

        checkAliasDebounce();
    };

    this.saveAlias = () => {
        $ngRedux.dispatch(actionCreators.saveAliasThunk(scope.user.alias));
    };
}

export default component;
import styles from './search-modal.less';
import containerStyle from '../../../styles/container/container.less';
import inlineStyles from '../../dumb/inline-characters/inline-characters.less';
import formStyles from '../../../styles/forms/forms.less';

export default function component () {
    return {
        restrict: 'E',
        scope: {},
        bindToController: {
            search: '&',
            close: '&',
            results: '=',
            term: '=',
            searching: '='
        },
        controller: SearchModal,
        controllerAs: 'searchModal',
        template: `
            <a 
                href=""
                ng-click="searchModal.close()"
                title="Close"
                class="${styles.closeContainer}">
                <i class="fa fa-times"></i>
            </a>

            <form
                class="${styles.form}"
                ng-submit="searchModal.search(searchModal.term)">
                <input
                    required="required"
                    type="text"
                    ng-model="searchModal.term"
                    class="${styles.searchTextbox}"
                    placeholder="Search Guild Wars 2 Armory" />

                <button 
                    title="Search" 
                    class="${formStyles.clearButton} ${styles.searchButton}">
                    <a class="${styles.searchButtonLink}"><i class="fa fa-search"></i></a>
                </button>
            </form>

            <div class="${styles.container}">
                <div class="${styles.inner}">
                    <progress-indicator [busy]="searchModal.searching"></progress-indicator>

                    <div 
                        ng-if="!searchModal.searching && !searchModal.results.length" 
                        class="${styles.notFound}">
                        Nothing could be found :-(
                    </div>

                    <search-result
                        ng-click="searchModal.close()"
                        ng-repeat="result in searchModal.results"
                        data="result"></search-result>
                </div>
            </div>
        `
    };
}

// @ngInject
function SearchModal () {
    this.close = this.close();
    this.search = this.search();
}
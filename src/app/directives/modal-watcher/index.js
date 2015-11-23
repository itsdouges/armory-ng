import modalSelector from '../../selectors/modal';
import searchSelector from '../../selectors/search';
import styles from './modal-watcher.less';
import searchActions from '../../actions/search';

export default function component () {
	return {
		restrict: 'A',
		scope: {},
		controller: ModalWatcher,
		controllerAs: 'modalWatcher',
		transclude: true,
		template: `
			<div 
				ng-if="modalWatcher.show"
				class="${styles.modal}">
				<search-modal
					search="modalWatcher.doSearch"
					searching="modalWatcher.search.searching"
					term="modalWatcher.search.term"
					results="modalWatcher.search.results"
					close="modalWatcher.closeSearchModal"></search-modal>
			</div>

			<div 
				class="match-height"
				ng-transclude
				footer-spacer></div>
		`
	};
}

// @ngInject
function ModalWatcher ($ngRedux, $scope, $element) {
	let that = this;

	function init () {
		const unsubscribeModal = $ngRedux.connect(modalSelector)((state) => {
			that.show = state.show;

			if (state.show) {
				$element.addClass('modal-open');
			} else {
				$element.removeClass('modal-open');
			}
		});

		const unsubscribeSelector = $ngRedux.connect(searchSelector)(that);

		$scope.$on('$destroy', unsubscribeModal);
		$scope.$on('$destroy', unsubscribeSelector);
	}

	function closeSearchModal () {
		$ngRedux.dispatch(searchActions.closeSearchThunk());
	}

	function doSearch (term) {
		$ngRedux.dispatch(searchActions.searchThunk(term));
	}

	this.doSearch = doSearch;
	this.closeSearchModal = closeSearchModal;

	init();
}
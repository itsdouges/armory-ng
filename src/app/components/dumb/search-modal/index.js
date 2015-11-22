import styles from './search-modal.less';
import containerStyle from '../../../styles/container/container.less';
import inlineStyles from '../../dumb/inline-characters/inline-characters.less';

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
					placeholder="Search characters, users, and guilds!" />
			</form>

			<div class="${styles.container}">
				<div class="${styles.inner}">
					<progress-indicator busy="searchModal.searching"></progress-indicator>

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
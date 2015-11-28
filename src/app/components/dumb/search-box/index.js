import styles from './search-box.less';
import formStyles from '../../../styles/forms/forms.less';

export default function component () {
	return {
		restrict: 'E',
		scope: {},
		bindToController: {
			search: '&'
		},
		controller: SearchBox,
		controllerAs: 'ctrl',
		template: `
			<form ng-submit="ctrl.dispatchSearch()">
				<div class="${styles.searchBoxContainer}">
					<input
						required
						placeholder="Search gw2armory, find characters, users, and guilds!"
						type="text"
						ng-model="ctrl.searchTerm"
						class="${styles.searchBox}" />

					<button 
						title="Search" 
						class="${formStyles.clearButton} ${styles.searchButton}">
						<a class="fa fa-search"></a>
					</button>
				</div>
			</form>
		`
	};
}

class SearchBox {
	constructor () {
		this.search = this.search();
	}

	dispatchSearch () {
		const term = this.searchTerm;
		this.searchTerm = '';
		this.search(term);
	}
}
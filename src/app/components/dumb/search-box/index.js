import styles from './search-box.less';
import formStyles from '../../../styles/forms/forms.less';

export default function component () {
	return {
		restrict: 'E',
		scope: {},
		controller: SearchBox,
		controllerAs: 'ctrl',
		template: `
			<form>
				<div class="${styles.searchBoxContainer}">
					<input	
						placeholder="Find characters, users, and guilds!"
						type="text" 
						class="${styles.searchBox}" />
				</div>

				<button title="Search" class="${formStyles.clearButton}">
					<i class="fa fa-search"></i>
				</button>
			</form>
		`
	};
}

class SearchBox {

}
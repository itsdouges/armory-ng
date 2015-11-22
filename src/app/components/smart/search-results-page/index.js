import styles from './search-results-page.less';
import containerStyle from '../../../styles/container/container.less';
import inlineStyles from '../../dumb/inline-characters/inline-characters.less';

export default function component () {
	return {
		restrict: 'E',
		scope: {},
		controller: SearchResultsPage,
		controllerAs: 'searchResultsPage',
		template: `
			<a href="" title="Close" class="${styles.closeContainer}">
				<i class="fa fa-times"></i>
			</a>

			<div class="${styles.container}">
				<div class="${styles.inner}">
					<search-result
						data="searchResultsPage.character"
						resource="character"></search-result>

					<search-result
						data="searchResultsPage.guild"
						resource="guild"></search-result>

					<search-result
						data="searchResultsPage.user"
						resource="user"></search-result>

					<search-result
						data="searchResultsPage.character"
						resource="character"></search-result>

					<search-result
						data="searchResultsPage.guild"
						resource="guild"></search-result>

					<search-result
						data="searchResultsPage.user"
						resource="user"></search-result>
				</div>
			</div>
		`
	};
}

// @ngInject
function SearchResultsPage ($stateParams) {
	this.character = {
		profession: 'elementalist',
		name: 'Coolguy',
		level: 80,
		race: 'Asura',
		accountName: 'haha-lol',
		alias: 'woo'
	};

	this.guild = {
		name: 'Ultra Lux'
	};

	this.user = {
		alias: 'madou'
	};
}
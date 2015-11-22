import styles from './search-result.less';
import professionStyles from '../character-viewer/character-viewer.less';

export default function component () {
	return {
		restrict: 'E',
		controller: SearchResult,
		controllerAs: 'searchResult',
		scope: {},
		bindToController: {
			resource: '@',
			data: '='
		},
		template: `
			<div
				class="${styles.image}"
				ng-style="searchResult.getStyle()"
				ng-class="searchResult.professionToClass(searchResult.data.profession)"></div>

			<div class="${styles.description}">
				<div class="${styles.name}">
					{{ searchResult.data.name || searchResult.data.alias }}
				</div>

				<div ng-if="searchResult.subtitle">
					{{ searchResult.subtitle }}
				</div>
			</div>
		`
	};
}

class SearchResult {
	constructor () {
		if (this.resource === 'character') {
			this.subtitle = `${this.data.level} ${this.data.race} ${this.data.profession}`;
		}
	}

	getStyle () {
		let url;

		switch (this.resource) {
			case 'user':
				url = `url('http://api.adorable.io/avatars/200/${this.data.alias}.png')`;
				break;

			case 'guild':
				url = `url('https://guilds.gw2w2w.com/guilds/${this.data.name}/256.svg')`;
				break;

			default:
				return;
		}

		return {
			backgroundImage: url
		};
	}

	professionToClass (profession) {
		if (profession) {
			return professionStyles[profession.toLowerCase()];
		}

		return '';
	}
}
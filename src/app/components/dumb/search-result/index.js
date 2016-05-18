import styles from './search-result.less';
import professionStyles from '../character-viewer/character-viewer.less';

export default function component () {
    return {
        restrict: 'E',
        controller: SearchResult,
        controllerAs: 'searchResult',
        scope: {},
        bindToController: {
            data: '='
        },
        template: `
            <a ng-href="{{ searchResult.getLink() }}">
                <div
                    class="${styles.image}"
                    ng-style="searchResult.getStyle()"
                    ng-class="searchResult.professionToClass(searchResult.data.profession)"></div>

                <div class="${styles.description}">
                    <div class="${styles.name}">
                        {{ searchResult.data.name }}
                    </div>

                    <div ng-if="searchResult.subtitle">
                        {{ searchResult.subtitle }}
                    </div>
                </div>
            </a>
        `
    };
}

class SearchResult {
    constructor () {
        if (this.data.resource === 'characters') {
            this.subtitle = `${this.data.level} ${this.data.race} ${this.data.profession}`;
        }
    }

    getLink () {
        switch (this.data.resource) {
            case 'characters':
                return `/${this.data.alias}/characters/${this.data.name}`;

            case 'users':
                return `/${this.data.name}`;

            case 'guilds':
                return `/g/${this.data.name}`;
        }
    }

    getStyle () {
        let url;

        switch (this.data.resource) {
            case 'users':
                url = `url('//api.adorable.io/avatars/200/${this.data.name}.png')`;
                break;

            case 'guilds':
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
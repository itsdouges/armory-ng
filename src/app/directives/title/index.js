export default function component () {
	return {
		restrict: 'E',
		scope: {},
		controller: Title
	};
}

const TITLE_PREFIX = 'gw2armory';

class Title {
	// @ngInject
	constructor ($element, $rootScope) {
		$rootScope.$on('$stateChangeStart', (event, toState, toParams) => {
			let title;

			if (toState.data && toState.data.title) {
				title = toState.data.fetchFromParams ? toParams[toState.data.title] : toState.data.title;

				if (toState.data.titleSuffix) {
					title += toState.data.titleSuffix;
				}

				title += ` | ${TITLE_PREFIX}`;
			} else {
				title = TITLE_PREFIX;
			}

			$element[0].innerHTML = title;
		});
	}
}
import styles from './characters-grid.less';

function component () {
  let directive = {
    restrict: 'E',
    controller: CharactersGrid,
    controllerAs: 'ctrl',
    scope: {},
    bindToController: {
      characters: '=',
      columns: '=',
      fetching: '=',
      mode: '@',
      displayMode: '@'
    },
    template: `
      <div class="${styles.borderContainer} ${styles.borderContainerTop}">
        <div class="${styles.border} ${styles.borderTopLeft}"></div>
        <div class="${styles.border} ${styles.borderTopRight}"></div>
      </div>

      <div 
        class="${styles.container}"
        ng-class="ctrl.displayMode === 'slider' ? '${styles.slider}' : '${styles.grid}'">
        <div 
          class="${styles.sliderMessage}" 
          ng-if="!ctrl.fetching && !ctrl.hasCharacters()">
          <span ng-if="ctrl.mode === 'public'">Oh, no characters were found.. :(</span>
          <span ng-if="ctrl.mode === 'authenticated'">Oh, you have no characters.. why not <a ui-sref="main.with-auth.with-container.settings"><strong>add a few api tokens</strong></a> to your account?</span>
        </div>

        <progress-indicator
          class="${styles.progress}"
          [busy]="ctrl.fetching && !ctrl.hasCharacters()">
        </progress-indicator>

        <inline-characters
          mode="{{ ctrl.mode }}"
          characters="ctrl.characters">
        </inline-characters>
      </div>
    `
  };

  return directive;
}

// @ngInject
function CharactersGrid ($element, $scope) {
  let that = this;

  that.hasCharacters = () => {
    return that.characters && that.characters.length;
  }
}

export default component;
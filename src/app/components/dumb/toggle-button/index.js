import styles from './toggle-button.less';

function component () {
  let directive = {
    restrict: 'E',
    controller: ToggleButton,
    controllerAs: 'toggleButton',
    scope: {},
    bindToController: {
      selected: '=',
      toggle: '&',
    },
    template: `
      <div ng-mouseout="toggleButton.onHover(false)" ng-mouseover="toggleButton.onHover(true)" class="${styles.toggleContainer}" ng-click="toggleButton.toggle()">
        <i ng-if="toggleButton.selected || toggleButton.hover" class="fa fa-check-square-o ${styles.positive}"></i>
        <i ng-if="!toggleButton.selected && !toggleButton.hover" class="fa fa-square-o ${styles.negative}"></i>
      </div>
    `
  };

  return directive;
}

class ToggleButton {
  onHover (hovering) {
    this.hover = hovering;
  }
}

export default component;

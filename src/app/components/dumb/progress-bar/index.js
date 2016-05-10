import styles from './progress-bar.less';

function component () {
  return {
    restrict: 'E',
    controller: ProgressBar,
    controllerAs: 'bar',
    scope: {},
    bindToController: {
      current: '=',
      max: '=',
      backgroundColour: '@',
      barColour: '@',
    },
    template: `
<div class="${styles.container}" ng-style="{ backgroundColor: '{{ bar.backgroundColour }}' }">
  <span class="${styles.bar}" ng-style="bar.calcBarStyles(bar.current, bar.max)"></span>
  <span class="${styles.progress}">
    <span>{{ bar.current }}/{{ bar.max }}</span>
  </span> 
</div>
`,
  };
}

class ProgressBar {
  calcBarStyles (current, max) {
    const percent = Math.ceil((current / max || 0) * 100);
    return {
      width: `${percent || 100}%`,
      backgroundColor: this.barColour,
    };
  }
}

export default component;

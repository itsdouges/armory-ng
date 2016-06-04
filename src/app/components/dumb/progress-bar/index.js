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
    <redacted on="!bar.current">{{ bar.current }}/{{ bar.max }}</redacted>
  </span> 
</div>
`,
  };
}

class ProgressBar {
  calcBarStyles (current, max) {
    const percent = max ? Math.ceil((current / max || 0) * 100) : 0;

    return {
      width: `${percent}%`,
      backgroundColor: this.barColour,
    };
  }
}

export default component;

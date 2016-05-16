import styles from './redacted.less';

function component () {
  return {
    restrict: 'E',
    controller: Redacted,
    controllerAs: 'redacted',
    scope: {},
    transclude: true,
    replace: true,
    bindToController: {
      on: '=',
    },
    template: `
<span>
  <span ng-class="redacted.on ? '${styles.on}' : ''" class="${styles.redacted}">
    <ng-transclude></ng-transclude>
  </span>
</span>
`,
  };
}

class Redacted {}

export default component;

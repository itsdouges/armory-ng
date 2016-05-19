import styles from './tier.less';

export default function component () {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      pips: '@',
      pipIcon: '=',
      number: '@',
      on: '@',
      points: '=',
    },
    controller: Tier,
    controllerAs: 'tier',
    template: `
<div class="${styles.group}">
  <pip
    on="tier.on || $index < tier.points"
    icon="tier.pipIcon"
    ng-repeat="pip in tier.getNumber(tier.pips) track by $index">
  </pip>

  <div ng-class="tier.on == 'true' ? '${styles.on}' : ''">
    {{ tier.number }}
  </div>
</div>
`
  };
}

class Tier {
  getNumber (number) {
    return new Array(parseInt(number || '2'));
  }
}

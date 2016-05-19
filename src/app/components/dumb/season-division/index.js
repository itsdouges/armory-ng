import styles from './season-division.less';

export default function component () {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      division: '=',
      current: '=',
    },
    controller: SeasonDivision,
    controllerAs: 'division',
    template: `
<div>
  <div class="${styles.heroIconContainer}">
    <img
      class="${styles.heroIcon}"
      ng-src="{{ division.division.large_icon || 'https://render.guildwars2.com/file/97E44C1BB3B7434639D470E9F25DD9C601ACEDD9/1313339.png' }}" />
  </div>

  <div class="${styles.name}"><redacted on="!division.division">{{ division.division.name || 'Division n: Squared' }}</redacted></div>
  
  <tier
    ng-repeat="tier in division.division.tiers track by $index"
    on="{{ $index < division.current.tier }}"
    points="division.current.points"
    pips="{{ tier.points }}"
    pip-icon="division.division.pip_icon"
    number="{{ $index + 1 }}">
  </tier>

  <tier ng-if="!division.division.tiers"
    ng-repeat="num in [1, 2, 3, 4, 5]"
    on="{{ false }}"
    points="0"
    pips="5"
    number="{{ num }}">
  </tier>

  <!--<div class="${styles.rules}">Division Rules</div>
  <div>
    <pip
      icon="division.division.pip_icon"
      small="true">
    </pip>

    {{ division.canLosePips ? 'Can lose pips.' : 'Cannot lose pips.' }}
  </div>
  <div>{{ division.canLoseTiers ? 'Can lose tiers.' : 'Cannot lose tiers.' }}</div>-->
</div>
`
  };
}

class SeasonDivision {
  // constructor () {
  //   if (this.division && this.division.rules) {
  //     this.canLosePips = (this.division.rules && this.division.rules.indexOf('CanLosePoints') === -1);
  //     this.canLoseTiers = (this.division.rules && this.division.rules.indexOf('CanLoseTiers') === -1);
  //   }
  // }
}

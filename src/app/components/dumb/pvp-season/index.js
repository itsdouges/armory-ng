import styles from './pvp-season.less';

export default function component () {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      season: '=',
      current: '=',
    },
    controller: PvpSeason,
    controllerAs: 'season',
    template: `
<div class="${styles.container}">
  <div class="${styles.title}"><redacted on="!season.season">{{ season.season.name || 'PvP League Season Flifty' }}</redacted></div>
  <div class="${styles.subtitle}">
    <span ng-if="season.season.active">Season ends on {{ season.parseDate(season.season.end) }}.</span>
    <span ng-if="!season.season.active"><redacted on="!season.season">Season has ended.</redacted></span>
  </div>

  <season-division
    current="season.current"
    division="season.season.divisions[season.current.division]">
  </season-division>
</div>
`
  };
}

class PvpSeason {
  parseDate (date) {
    if (date) {
      return new Date(date).toDateString();
    }
  }
}

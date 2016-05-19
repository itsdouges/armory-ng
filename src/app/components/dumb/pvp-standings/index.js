import styles from './pvp-standings.less';

export default function component () {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      standings: '=',
      seasons: '=',
    },
    controller: PvpStandings,
    controllerAs: 'standings',
    template: `
<div class="${styles.container}">
  <pvp-season
    current="standings.latest().current"
    season="standings.seasons[standings.latest().season_id]">
  </pvp-season>
</div>
`
  };
}

class PvpStandings {
  latest () {
    if (this.seasons && this.standings) {
      return this.standings[this.standings.length - 1];
    }
  }
}

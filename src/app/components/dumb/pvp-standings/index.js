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
  <carousel max="standings.standings.length - 1">
    <pvp-season
      ng-repeat="standing in standings.standings"
      current="standing.current"
      season="standings.seasons[standing.season_id]">
    </pvp-season>
    <pvp-season ng-if="!standings.standings.length"></pvp-season>
  </carousel>
</div>
`
  };
}

class PvpStandings {}

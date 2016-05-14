import styles from './pvp-games.less';

function component () {
  return {
    restrict: 'E',
    controller: PvpGames,
    controllerAs: 'pvp',
    scope: {},
    bindToController: {
      games: '=',
    },
    template: `
<div>
  <div class="${styles.listContainer}">
    <h2>Recent games</h2>

    <div class="${styles.list}">
      <pvp-game
        ng-repeat="game in pvp.games"
        game="game">
      </pvp-game>
    </div>
  </div>
</div>
`,
  };
}

class PvpGames {}

export default component;

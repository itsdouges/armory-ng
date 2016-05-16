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
<div class="${styles.listContainer}">
  <h2>Recent games</h2>

  <div ng-class="pvp.expanded ? '${styles.expanded}' : ''" class="${styles.list}">
    <pvp-game
      ng-repeat="game in pvp.games track by game.id"
      game="game">
    </pvp-game>

    <pvp-game ng-if="!pvp.games || !pvp.games.length"></pvp-game>
  </div>
</div>
`,
  };
}

class PvpGames {
  expand () {
    this.expanded = true;
  }
}

export default component;

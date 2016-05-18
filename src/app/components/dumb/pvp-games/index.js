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

  <carousel max="pvp.games.length - 1">
    <pvp-game
      ng-repeat="game in pvp.games track by game.id"
      game="game">
    </pvp-game>

    <pvp-game ng-if="!pvp.games || !pvp.games.length"></pvp-game>
  </carousel>
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

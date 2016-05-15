import styles from './pvp-game.less';

function component () {
  return {
    restrict: 'E',
    controller: PvpGame,
    controllerAs: 'pvp',
    scope: {},
    bindToController: {
      game: '=',
    },
    template: `
<card mode="inline">
  <div class="${styles.container}">
    <div class="${styles.innerContainer}">
      <div class="${styles.column}">
        <icon name="{{ pvp.game.profession }}"></icon>

        <div
          ng-class="pvp.teamToClass(pvp.game.team)"
          class="${styles.result}">
          {{ pvp.game.result.toUpperCase() }}
        </div>
      </div>

      <div class="${styles.stretch} ${styles.spreadItems}">
        <div>
          <div class="${styles.red}">RED</div>
          <div>{{ pvp.game.scores.red }}</div>
        </div>

        <div>
          <div class="${styles.blue}">BLUE</div>
          <div>{{ pvp.game.scores.blue }}</div>
        </div>
      </div>

      <div class="${styles.stats} ${styles.spreadItems}">
        <div>
          <div>{{ pvp.game.rating_type }}</div>
          <div ng-if="pvp.game.season"><a ng-href="pvp/season/{{ pvp.game.season }}">View Season</a></div>
        </div>

        <div>
          <div>{{ pvp.calculateMatchInMinutes(pvp.game.started, pvp.game.ended) || 0 }} minutes, on</div>
          <div>{{ pvp.stringToDate(pvp.game.ended) }}</div>
        </div>
      </div>
    </div>

    <gw2-map map-id="{{ pvp.game.map_id }}"></gw2-map>
  </div>
</card>
`,
  };
}

class PvpGame {
  stringToDate (date) {
    return !!date && new Date(date).toDateString();
  }

  teamToClass (team) {
    return !!team && styles[team.toLowerCase()];
  }

  calculateMatchInMinutes (start, end) {
    return !!start && !!end && new Date(new Date(end) - new Date(start)).getMinutes();
  }
}

export default component;

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
    <gw2-map map-id="{{ pvp.game.map_id }}"></gw2-map>

    <div class="${styles.innerContainer}">
      <div class="${styles.column} ${styles.medium}">
        <icon name="{{ pvp.game.profession || 'Necromancer' }}"></icon>

        <div
          ng-class="pvp.teamToClass(pvp.game.team || 'red')"
          class="${styles.result}">
          <redacted on="!pvp.game.id">{{ pvp.game.result.toUpperCase() || 'FORFEIT' }}</redacted>
        </div>
      </div>

      <div class="${styles.stretch} ${styles.spreadItems}">
        <div>
          <div class="${styles.red}"><redacted on="!pvp.game.id">RED</redacted></div>
          <div><redacted on="!pvp.game.id">{{ pvp.game.scores.red || '25' }}</redacted></div>
        </div>

        <div>
          <div class="${styles.blue}"><redacted on="!pvp.game.id">BLUE</redacted></div>
          <div><redacted on="!pvp.game.id">{{ pvp.game.scores.blue || '101' }}</redacted></div>
        </div>
      </div>

      <div class="${styles.stats} ${styles.spreadItems} ${styles.big}">
        <div>
          <div><redacted on="!pvp.game.id">{{ pvp.game.rating_type || 'Ranked' }}</redacted></div>
          <div ng-if="pvp.game.season"><a ng-href="pvp/season/{{ pvp.game.season }}">View Season</a></div>
        </div>

        <div>
          <div><redacted on="!pvp.game.id">{{ pvp.calculateMatchInMinutes(pvp.game.started, pvp.game.ended) || 0 }} minutes, on</redacted></div>
          <div><redacted on="!pvp.game.id">{{ pvp.stringToDate(pvp.game.ended) || 'Groundhog Day' }}</redacted></div>
        </div>
      </div>
    </div>
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

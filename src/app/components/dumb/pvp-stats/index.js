import styles from './pvp-stats.less';

export default function component () {
  return {
    restrict: 'E',
    scope: {},
    controller: PvpStats,
    controllerAs: 'pvp',
    bindToController: {
      stats: '=',
    },
    template: `
<div class="${styles.container}">
 <pvp-rank
    rank="{{ pvp.stats.pvp_rank }}"
    points="{{ pvp.stats.pvp_rank_points }}">
  </pvp-rank>

  <card
    card-title="Unranked"
    card-title-right="Ranked"
    class="${styles.ranksContainer}">
    <div class="${styles.unrankedContainer}">
      <div class="${styles.win}">
        {{ pvp.stats.ladders.unranked.wins || 0 }} Wins
      </div>

      <div class="${styles.lose}">
        {{ pvp.stats.ladders.unranked.losses || 0 }} Losses
      </div>
    </div>

    <div class="${styles.rankedContainer}">
      <div class="${styles.win}">
        {{ pvp.stats.ladders.ranked.wins || 0 }} Wins
      </div>

      <div class="${styles.lose}">
        {{ pvp.stats.ladders.ranked.losses || 0 }} Losses
      </div>
    </div>
  </card>
</div>
    `
  };
}

class PvpStats {}

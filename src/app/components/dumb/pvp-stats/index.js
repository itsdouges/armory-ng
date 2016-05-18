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
        <div class="${styles.bigWin}">
          <redacted on="!pvp.stats.pvp_rank">{{ pvp.stats.ladders.unranked.wins || 0 }} Wins</redacted>
        </div>
      
        <div>
          <redacted on="!pvp.stats.pvp_rank">{{ pvp.stats.ladders.unranked.byes || 0 }} Byes</redacted>
        </div>
      </div>

      <div class="${styles.lose}">
        <div>
          <redacted on="!pvp.stats.pvp_rank">{{ pvp.stats.ladders.unranked.losses || 0 }} Losses</redacted>
        </div>
      
        <div>
          <redacted on="!pvp.stats.pvp_rank">{{ pvp.stats.ladders.unranked.forfeits || 0 }} Forfeits</redacted>
        </div>

        <div>
          <redacted on="!pvp.stats.pvp_rank">{{ pvp.stats.ladders.unranked.desertions || 0 }} Desertions</redacted>
        </div>
      </div>
    </div>

    <div class="${styles.rankedContainer}">
      <div class="${styles.win}">
        <div class="${styles.bigWin}">
          <redacted on="!pvp.stats.pvp_rank">{{ pvp.stats.ladders.ranked.wins || 0 }} Wins</redacted>
        </div>
      
        <div>
          <redacted on="!pvp.stats.pvp_rank">{{ pvp.stats.ladders.ranked.byes || 0 }} Byes</redacted>
        </div>
      </div>

      <div class="${styles.lose}">
        <div>
          <redacted on="!pvp.stats.pvp_rank">{{ pvp.stats.ladders.ranked.losses || 0 }} Losses</redacted>
        </div>

        <div>
          <redacted on="!pvp.stats.pvp_rank">{{ pvp.stats.ladders.ranked.forfeits || 0 }} Forfeits</redacted>
        </div>

        <div>
          <redacted on="!pvp.stats.pvp_rank">{{ pvp.stats.ladders.ranked.desertions || 0 }} Desertions</redacted>
        </div>
      </div>
    </div>
  </card>
</div>
    `
  };
}

class PvpStats {}

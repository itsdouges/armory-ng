import styles from './pvp-rank.less';

export default function component () {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      rank: '@',
      points: '@',
    },
    controller: PvpRank,
    controllerAs: 'rank',
    template: `
<div>
  <div class="${styles.rankContainer}">
    <div class="${styles.icon}" ng-style="rank.calculateIconStyle(rank.rank)"></div>
    <div class="${styles.progressContainer}">
      <div class="${styles.name}">{{ rank.rankName }}</div>
      <progress-bar
        bar-colour="rgb(85, 35, 164)"
        background-colour="rgb(41, 41, 41)"
        current="rank.calculateExperienceInCurrentLevel(rank.rank, rank.points)"
        max="rank.calculateRankExperience(rank.rank)">
      </progress-bar>
    </div>
  </div>
</div>
    `
  };
}

class PvpRank {
  calculateExperienceInCurrentLevel (rank, currentPoints) {
    let totalExperience = 0;
    const nextLevel = +rank;

    for (let i = 1; i <= nextLevel; i++) {
      totalExperience += this.calculateRankExperience(i);
    }

    return totalExperience - currentPoints;
  }

  calculateRankExperience (rank) {
    let totalExpForNextLevel;

    if (rank === 1) {
      totalExpForNextLevel = 0;
    } else if (rank >= 2 && rank <= 5) {
      totalExpForNextLevel = 500;
    } else if (rank >= 6 && rank <= 8) {
      totalExpForNextLevel = 1500;
    } else if (rank >= 9 && rank <= 18) {
      totalExpForNextLevel = 4000;
    } else if (rank >= 19 && rank <= 28) {
      totalExpForNextLevel = 7500;
    } else if (rank >= 29 && rank <= 38) {
      totalExpForNextLevel = 15000;
    } else if (rank) {
      totalExpForNextLevel = 20000;
    } else {
      totalExpForNextLevel = 0;
    }

    return totalExpForNextLevel;
  }

  calculateIconStyle (rank) {
    let image;
    let name;

    if (rank >= 1 && rank <= 9) {
      name = 'Rabbit';
      image = require('../../../../assets/images/pvp/rabbit.png');
    } else if (rank >= 10 && rank <= 19) {
      name = 'Deer';
      image = require('../../../../assets/images/pvp/deer.png');
    } else if (rank >= 20 && rank <= 29) {
      name = 'Dolyak';
      image = require('../../../../assets/images/pvp/dolyak.png');
    } else if (rank >= 30 && rank <= 39) {
      name = 'Wolf';
      image = require('../../../../assets/images/pvp/wolf.png');
    } else if (rank >= 40 && rank <= 49) {
      name = 'Tiger';
      image = require('../../../../assets/images/pvp/tiger.png');
    } else if (rank >= 50 && rank <= 59) {
      name = 'Bear';
      image = require('../../../../assets/images/pvp/bear.png');
    } else if (rank >= 60 && rank <= 69) {
      name = 'Shark';
      image = require('../../../../assets/images/pvp/shark.png');
    } else if (rank >= 70 && rank <= 79) {
      name = 'Phoenix';
      image = require('../../../../assets/images/pvp/phoenix.png');
    } else if (rank) {
      name = 'Dragon';
      image = require('../../../../assets/images/pvp/dragon.png');
    } else {
      name = 'Rabbit';
      image = require('../../../../assets/images/pvp/rabbit.png');
    }

    this.rankName = name;

    return {
      backgroundImage: `url(${image})`,
    };
  }
}

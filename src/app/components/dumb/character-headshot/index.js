import styles from './character-headshot.less';

function component () {
  let directive = {
    restrict: 'E',
    scope: {},
    bindToController: {
      character: '='
    },
    controller: CharacterHeadshot,
    controllerAs: 'headshot',
    template: `
      <div
        class="${styles.image}"
        ng-class="headshot.professionToClass(headshot.character.profession)"></div>
        
      <div class="${styles.info}">
        <div class="${styles.name}">
          {{ headshot.character.name }}
        </div>

        <div class="${styles.profession}">
          {{ headshot.character.level }}
          {{ headshot.character.race }}
          {{ headshot.character.profession }}
        </div>
      </div>
    `
  };

  return directive;
}

class CharacterHeadshot {
  professionToClass (profession) {
    if (profession) {
      return styles[profession.toLowerCase()];
    }
  }
}

export default component;

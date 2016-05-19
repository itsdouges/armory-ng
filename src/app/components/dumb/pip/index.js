import styles from './pip.less';
import emptyPip from '../../../../assets/images/pvp/empty-pip.png';

export default function component () {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      on: '=',
      icon: '=',
    },
    controller: DivisionPip,
    controllerAs: 'pip',
    template: `
<div class="${styles.emptyPip}" style="background-image: url(${emptyPip})">
  <div ng-if="pip.on === 'true'" class="${styles.pip}" ng-style="pip.getStyle()">
  </div>
</div>
`
  };
}

class DivisionPip {
  getStyle () {
    return {
      backgroundImage: `url(${this.icon})`,
    };
  }
}

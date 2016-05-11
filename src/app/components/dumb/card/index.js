import styles from './card.less';

export default function component () {
  return {
    restrict: 'E',
    scope: {},
    controller: Card,
    controllerAs: 'card',
    bindToController: {
      cardTitle: '@',
      cardTitleRight: '@',
      class: '@',
    },
    transclude: true,
    template: `
<div ng-class="card.class">
  <h2 class="${styles.title}">
    <span>{{ card.cardTitle }}</span>
    <span class="${styles.titleRight}">{{ card.cardTitleRight }}</span>
  </h2>
  <div class="${styles.card} ${styles.primary}">
    <ng-transclude></ng-transclude>
  </div>
</div>
    `
  };
}

class Card {}

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
      mode: '@',
    },
    transclude: true,
    template: `
<div ng-class="card.mode === 'inline' ? '${styles.inline}' : ''">
  <h2 ng-if="card.cardTitle || card.cardTitleRight" class="${styles.title}">
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

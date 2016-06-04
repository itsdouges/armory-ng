import styles from './carousel.less';

export default function component () {
  return {
    restrict: 'E',
    scope: {},
    controller: Carousel,
    controllerAs: 'carousel',
    bindToController: {
      max: '=',
    },
    transclude: true,
    template: `
<div class="${styles.carouselContainer}">
  <div
    ng-transclude
    class="${styles.carousel}"
    ng-style="carousel.getStyle()">
  </div>

  <div
    ng-show="carousel.current > 0"
    class="${styles.button} ${styles.left}"
    ng-click="carousel.previous()">
    <i class="fa fa-chevron-left"></i>
  </div>

  <div
    ng-show="carousel.current < carousel.max"
    class="${styles.button} ${styles.right}"
    ng-click="carousel.next()">
    <i class="fa fa-chevron-right"></i>
  </div>
</div>
`
  };
}

class Carousel {
  constructor () {
    this.current = 0;
  }

  next () {
    if (this.current >= this.max) {
      return;
    }

    this.current += 1;
  }

  previous () {
    if (this.current <= 0) {
      return;
    }

    this.current -= 1;
  }

  getStyle () {
    const transform = `translate3d(${-100 * this.current}%, 0, 0)`;
    return {
      transform: transform,
      'webkit-transform': transform,
    };
  }
}

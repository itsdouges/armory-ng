import styles from './specialization-trait.less';

function component () {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      trait: '=',
      active: '=',
      showTooltip: '&'
    },
    template: `
      <div
        ng-mouseenter="ctrl.showTooltip({ show: true, type: ctrl.trait.name })"
        ng-mouseleave="ctrl.showTooltip({ show: false })"
        class="${styles.traitIcon} {{ ctrl.active ? '${styles.active}' : '' }}"
        style="background-image: url('{{ ctrl.trait.icon }}');"></div>
    `,
    controller: SpecializationTrait,
    controllerAs: 'ctrl'
  };
}

class SpecializationTrait {
  constructor () {
    this.showTooltip = this.showTooltip();
  }
}

export default component;

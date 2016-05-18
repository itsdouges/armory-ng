import styles from './icon.less';

function component () {
  let directive = {
    restrict: 'E',
    scope: {},
    bindToController: {
      name: '@'
    },
    controller: Icon,
    controllerAs: 'icon',
    template: `
      <div
        class="${styles.icon}"
        title="{{ icon.name }}"
        ng-class="icon.nameToClass(icon.name)">
      </div>
    `
  };

  return directive;
}

class Icon {
  nameToClass (name) {
    if (!name) {
      return undefined;
    }

    return styles[name.toLowerCase()];
  }
}

export default component;

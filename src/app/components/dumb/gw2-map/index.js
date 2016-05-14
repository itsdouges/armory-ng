import styles from './gw2-map.less';
import getMapData from 'app/services/gw2/map';

function component () {
  return {
    restrict: 'E',
    controller: Gw2Map,
    controllerAs: 'map',
    scope: {},
    replace: true,
    bindToController: {
      mapId: '@',
    },
    template: `
<div class="${styles.map}">
  <span title="{{ map.name }}" class="${styles.name}">{{ map.name }}</span>
</div>
`,
  };
}

class Gw2Map {
  constructor () {
    getMapData(this.mapId)
      .then((data) => {
        this.name = data.name;
      });
  }
}

export default component;

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
<div ng-style="{ backgroundImage: 'url({{ map.getImage(map.mapId) }})' }" class="${styles.map}">
  <span title="{{ map.name }}" class="${styles.name}"><redacted on="!map.mapId">{{ map.name || 'Unknown' }}</redacted></span>
</div>
`,
  };
}

class Gw2Map {
  /*@ngInject*/
  constructor ($scope) {
    this.mapId && getMapData(this.mapId)
      .then((data) => {
        this.name = data.name;
        $scope.$apply();
      });
  }

  getImage (id) {
    // return id && require(`../../../../assets/images/maps/${id}.jpg`);
  }
}

export default component;

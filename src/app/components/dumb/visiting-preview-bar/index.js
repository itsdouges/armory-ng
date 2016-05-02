import config from '../../../app.env';
import styles from './visiting-preview-bar.less';

function component () {
  return {
    restrict: 'E',
    scope: {},
    controller: VisitingPreviewBar,
    controllerAs: 'preview',
    template: `
      <div ng-if="preview.visiting" class=${styles.preview}>
        You're visiting <strong>preview.gw2armory.com</strong>. Unless you're interested in testing latest features why not head back over to <a ng-href="{{ preview.main }}"><strong>gw2armory.com</strong></a> :-)?
      </div>
    `
  };
}

class VisitingPreviewBar {
  constructor () {
    this.visiting = config.previewDomain;
    if (this.visiting) {
      document.body.style.marginBottom = '2rem';

      this.main = `${window.location.href.replace(window.location.host, 'gw2armory.com')}`;
    }
  }
}

export default component;

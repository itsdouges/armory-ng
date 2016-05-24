import styles from './footer.less';
import { actionCreators } from '../../../actions/window';

// @ngInject
function component ($window, $timeout) {
  let directive = {
    restrict: 'E',
    scope: {},
    controller: Footer,
    controllerAs: 'footer',
    template: `
    <ul class="${styles.links}">
      <li>
        <a
          target="_blank" 
          title="Planned features" 
          href="https://trello.com/b/qGvDe622">
          <i class="fa fa-trello"></i>
        </a>
      </li>

      <li>
        <a
          target="_blank" 
          title="Like to contribute? Look at the trello board or contact me on reddit or twitter to find something you'd like to work on, then make a pull request against the development branch." 
          href="https://github.com/madou/armory-front">
          <i class="fa fa-github"></i>
        </a>
      </li>
    </ul>

    <p>
      © 2015-{{ footer.year }} gw2armory.com © 2010–{{ footer.year }} ArenaNet, LLC. All rights reserved. Guild Wars, Guild Wars 2, Guild Wars 2: Heart of Thorns, ArenaNet, NCSOFT, the Interlocking NC Logo, and all associated logos and designs are trademarks or registered trademarks of NCSOFT Corporation. All other trademarks are the property of their respective owners.
    </p>

    <build-stats></build-stats>
    `
  };

  return directive;
}

/*@ngInject*/
function Footer () {
  this.year = new Date().getFullYear();
}

export default component;

'use strict';

import containerStyles from './styles/container/container.less';
import cardStyles from './styles/cards/cards.less';

// @ngInject
function routerConfig ($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('main', {
      template: `
        <header></header>

        <ui-view columns-calculator toasts-enabled></ui-view>

        <spacer></spacer>
        <footer class="${containerStyles.container} ${containerStyles.withColumns}"></footer>
      `,
      abstract: true
    })
    .state('main.no-auth', {
      abstract: true,
      template: '<ui-view></ui-view>',
      resolve: {
        authenticated: /*@ngInject*/ function (authService, $q) {
          return authService.checkAuthentication()
            .then(null, () => {
              return $q.resolve();
            });
        }
      }
    })
    .state('main.no-auth.with-container', {
      abstract: true,
      template: `<div class="${containerStyles.container} ${containerStyles.withColumns} ${containerStyles.container} ${containerStyles.centerItems}"><ui-view></ui-view></div>`
    })
    .state('main.no-auth.with-container.home', {
      url: '/',
      template: `
        <news-block>
          <h2>News</h2>

          <div class="${cardStyles.card} ${cardStyles.medium} ${cardStyles.primary}">
            <h3>Flipping the switch</h3>

            <p>Oh hi there. You're one of the first to visit gw2armory.com! Currently things are quite bare bones, but will be refined and extended over time. Feel free to register/login, add some api tokens, and check out your characters.</p>
          </div>
        </news-block>
      `
    })
    .state('main.no-auth.with-container.login', {
      url: '/login',
      template: `
        <h2>Login</h2>

        <login-box class="${cardStyles.card} ${cardStyles.small} ${cardStyles.primary}"></login-box>
      `
    })
    .state('main.no-auth.with-container.signup', {
      url: '/signup',
      template: `
        <h2>Signup</h2>

        <register-box class="${cardStyles.card} ${cardStyles.small} ${cardStyles.primary}"></register-box>
      `
    })
    .state('main.no-auth.not-found', {
      url: '/404',
      template: '<img src="https://static.staticwars.com/quaggans/404.jpg" />'
    })
    .state('main.with-auth', {
      abstract: true,
      template: '<ui-view></ui-view>',
      resolve: {
        authenticated: /*@ngInject*/ function (authService, $state) {
          return authService.checkAuthentication()
            .then(null, () => {
              $state.go('main.no-auth.with-container.login');
            });
        }
      }
    })
    .state('main.with-auth.with-container', {
      abstract: true,
      template: `
        <div class="${containerStyles.container}">
          <ui-view></ui-view>
        </div>
      `
    })
    .state('main.with-auth.with-container.settings', {
      url: '/settings',
      template: `
        <h2>Api tokens</h2>
        <user-tokens class="${cardStyles.card} ${cardStyles.medium} ${cardStyles.primary}"></user-tokens>

        <h2>Alias (disabled)</h2>
        <change-alias class="${cardStyles.card} ${cardStyles.medium} ${cardStyles.primary}"></change-alias>

        <h2>Password (disabled)</h2>
        <change-password class="${cardStyles.card} ${cardStyles.medium} ${cardStyles.primary}"></change-password>
      `
    })
    .state('main.with-auth.characters', {
      url: '/me/characters',
      template: `
        <characters-slider mode="authenticated"></characters-slider>

        <div class="${containerStyles.container}">
          <character-viewer mode="public"></character-viewer>
        </div>
      `
    })
    .state('main.with-auth.characters.character', {
      url: '/:name'
    });

	$locationProvider.html5Mode(false).hashPrefix('!');
  $urlRouterProvider.otherwise('/404');
}

export default routerConfig;

'use strict';

import containerStyles from './styles/container/container.less';
import cardStyles from './styles/cards/cards.less';

// @ngInject
function routerConfig ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(false).hashPrefix('!');
    
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
        authenticated: /*@ngInject*/ (authService, $q) => {
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
      url: '',
      template: `
        <news-block>
          <!--<h2>25/10 update</h2>

          <div class="${cardStyles.card} ${cardStyles.medium} ${cardStyles.primary}">
            <h3>Let's be social!</h3>
            <p>At the heart of an armory all we want to do is show off our gear, and our sweet outfits. Well now you can! You'll find the social buttons floating near the middle of the screen, click and follow the prompts!</p>

            ~ madou
          </div>-->

          <h2>gw2armory start</h2>
          <div class="${cardStyles.card} ${cardStyles.medium} ${cardStyles.primary}">
            <h3>Flipping the switch</h3>

            <p>Hey! You're one of the first to visit gw2armory.com! Currently things are quite bare bones, but will be refined and extended over time. Feel free to register/login, add some api tokens, and check out your characters.</p>
            ~ madou
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
    .state('main.no-auth.with-container.not-found', {
      url: '/404',
      template: '<h2>404!</h2><p>Oh no this page doesn\'t exist :(. <a href="/"><strong>Let\'s get out of here!</strong></a></p>'
    })
    .state('main.with-auth', {
      abstract: true,
      template: '<ui-view></ui-view>',
      resolve: {
        authenticated: /*@ngInject*/ (authService, $state) => {
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
    .state('main.with-auth.me', {
      url: '/me',
      template: `
        <user-details mode="authenticated"></user-details>
      `
    })
    .state('main.with-auth.characters', {
      url: '/me/characters',
      template: `
        <character-page mode="authenticated"></character-page>
      `
    })
    .state('main.with-auth.characters.character', {
      url: '/:name'
    })
    //TODO Make abstract public user route
    .state('main.no-auth.user', {
      url: '/:alias',
      template: `
        <user-details mode="public"></user-details>
      `,
      resolve: {
        findingUser: /*@ngInject*/ (authService, $stateParams) => {
          return authService.getUser($stateParams.alias)
            .then(null, () => {
              console.log('lmao not found 1');
              $state.go('main.no-auth.with-container.not-found');
            });
        }
      }
    })
    //TODO Make abstract public user route
    .state('main.no-auth.usercharacter', {
      url: '/:alias/characters',
      template: `
        <character-page mode="public"></character-page>
      `,
      resolve: {
        findingUser: /*@ngInject*/ (authService, $stateParams, $state, $q) => {
          return authService.getUser($stateParams.alias)
            .then(null, () => {
              console.log('lmao not found 2');
              $state.go('main.no-auth.with-container.not-found');
            });
        }
      }
    })
    .state('main.no-auth.usercharacter.character', {
      url: '/:name'
    });

  $urlRouterProvider.otherwise('/404');
}

export default routerConfig;

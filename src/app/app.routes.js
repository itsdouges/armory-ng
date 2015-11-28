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

        <ui-view
          toasts-enabled></ui-view>

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
      data: {
        title: 'News'
      },
      template: `
        <news-block>
          <h2>guilds | 15/11</h2>

          <div class="${cardStyles.card} ${cardStyles.medium} ${cardStyles.primary}">
            <p>Guild pages have been implemented! (see: <a href="/#!/g/Ultra%20Lux"><strong>Ultra Lux's</strong></a> guild page). When viewing a character click on the guild tag or on the guild emblem at the bottom of the page to see what characters are representing that guild currently. Emblems supplied thanks to <a target="_blank" href="http://guilds.gw2w2w.com/"><strong>gw2w2w</strong></a>. Enjoy! More updates soon.</p>

            ~ madou
          </div>

          <h2>sharing | 25/10</h2>
          <div class="${cardStyles.card} ${cardStyles.medium} ${cardStyles.primary}">
            <p>At the heart of an armory all we want to do is show off what you got. Well now you can! You'll find the sharing buttons at the bottom of both user and character pages, click and follow the prompts! Currently only copy to clipboard is supported, but Facebook, and Twitter are soon to follow! Check out my <a href="#!/madou"><strong>account</strong></a>, and <a href="#!/madou/characters/Cyberplus"><strong>reaper</strong></a>!</p>

            ~ madou
          </div>

          <h2>start | 19/10</h2>
          <div class="${cardStyles.card} ${cardStyles.medium} ${cardStyles.primary}">
            <p>Hey! You're one of the first to visit gw2armory.com! Currently things are quite bare bones, but will be refined and extended over time. Feel free to register/login, add some api tokens, and check out your characters.</p>
            ~ madou
          </div>
        </news-block>
      `
    })
    .state('main.no-auth.with-container.login', {
      url: '/in',
      data: {
        title: 'Login'
      },
      template: `
        <h2>Login</h2>

        <login-box class="${cardStyles.card} ${cardStyles.small} ${cardStyles.primary}"></login-box>
      `
    })
    .state('main.no-auth.search-results', {
      url: '/temp',
      data: {
        title: 'Search Results'
      },
      template: `
        <search-results-page></search-results-page>
      `
    })
    .state('main.no-auth.with-container.signup', {
      url: '/join',
      data: {
        title: 'Join'
      },
      template: `
        <h2>Join</h2>

        <register-box class="${cardStyles.card} ${cardStyles.small} ${cardStyles.primary}"></register-box>
      `
    })
    .state('main.no-auth.with-container.not-found', {
      data: {
        title: '404'
      },
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
      url: '/me/settings',
      data: {
        title: 'Settings'
      },
      template: `
        <user-settings-page></user-settings-page>
      `
    })
    .state('main.with-auth.me', {
      url: '/me',
      data: {
        title: 'Me'
      },
      template: `
        <user-page mode="authenticated"></user-page>
      `
    })
    .state('main.with-auth.characters', {
      data: {
        title: 'My Characters'
      },
      url: '/me/characters',
      template: `
        <character-page mode="authenticated"></character-page>
      `
    })
    .state('main.with-auth.characters.character', {
      data: {
        title: 'name',
        fetchFromParams: true
      },
      url: '/:name'
    })
    .state('main.no-auth.user', {
      url: '/:alias',
      data: {
        title: 'alias',
        fetchFromParams: true
      },
      template: `
        <user-page mode="public"></user-page>
      `,
      resolve: {
        findingUser: /*@ngInject*/ (authService, $stateParams) => {
          return authService.getUser($stateParams.alias)
            .then(null, () => {
              $state.go('main.no-auth.with-container.login');
            });
        }
      }
    })
    .state('main.no-auth.usercharacter', {
      url: '/:alias/characters',
      data: {
        title: 'alias',
        titleSuffix: '\'s characters',
        fetchFromParams: true
      },
      template: `
        <character-page mode="public"></character-page>
      `,
      resolve: {
        findingUser: /*@ngInject*/ (authService, $stateParams, $state) => {
          return authService.getUser($stateParams.alias)
            .then(null, () => {
              $state.go('main.no-auth.with-container.not-found');
            });
        }
      }
    })
    .state('main.no-auth.usercharacter.character', {
      url: '/:name',
      data: {
        title: 'name',
        titleSuffix: undefined,
        fetchFromParams: true
      },
    })
    .state('main.no-auth.guild', {
      url: '/g/:guildName',
      data: {
        title: 'guildName',
        fetchFromParams: true
      },
      template: `
        <guild-page></guild-page>
      `,
      resolve: {
        guild: /*@ngInject*/ (authService, $stateParams, $state) => {
          return authService.getGuild($stateParams.guildName)
            .then(null, () => {
              $state.go('main.no-auth.with-container.not-found');
            });
        }
      }
    });

  $urlRouterProvider.otherwise(($injector, $location) => {
     var state = $injector.get('$state');
     state.go('main.no-auth.with-container.not-found');
     return $location.path();
  });
}

export default routerConfig;

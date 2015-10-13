'use strict';

// @ngInject
function routerConfig ($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('main', {
      template: require('./routes/main.html'),
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
      template: '<div class="container with-columns center-items"><ui-view></ui-view></div>'
    })
    .state('main.no-auth.with-container.home', {
      url: '/',
      template: require('./routes/home/home.html')
    })
    .state('main.no-auth.with-container.login', {
      url: '/login',
      template: require('./routes/login/login.html')
    })
    .state('main.no-auth.with-container.signup', {
      url: '/signup',
      template: require('./routes/signup/signup.html')
    })
    .state('main.no-auth.not-found', {
      url: '/404',
      template: require('./routes/404/404.html')
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
      template: '<div class="container"><ui-view></ui-view></div>'
    })
    .state('main.with-auth.with-container.settings', {
      url: '/settings',
      template: require('./routes/settings/settings.html')
    })
    .state('main.with-auth.characters', {
      url: '/me/characters',
      template: require('./routes/me/characters/characters.html')
    })
    .state('main.with-auth.characters.character', {
      url: '/:name'
    });

	$locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/404');
}

export default routerConfig;

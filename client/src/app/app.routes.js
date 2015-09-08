'use strict';

function routerConfig ($stateProvider, $urlRouterProvider, $locationProvider) {
  'ngInject';
  
  $stateProvider
    .state('main', {
      templateUrl: 'app/routes/main.html',
      abstract: true
    })
    .state('main.without-auth', {
      abstract: true,
      template: '<ui-view />',
      resolve: {
        authenticated: function (authService, $state, $q) {
          return authService.checkAuthentication()
            .then(null, () => {
              return $q.resolve();
            });
        }
      }
    })
    .state('main.without-auth.home', {
      url: '/',
      templateUrl: 'app/routes/home/home.html',
    })
    .state('main.without-auth.login', {
      url: '/login',
      templateUrl: 'app/routes/login/login.html'
    })
    .state('main.without-auth.character', {
      url: '/characters/{name}',
      templateUrl: 'app/routes/characters/characters.html'
    })
    .state('main.without-auth.not-found', {
      url: '/404',
      template: 'cant find it man'
    })
    .state('main.with-auth', {
      abstract: true,
      template: '<ui-view />',
      resolve: {
        authenticated: function (authService, $state) {
          return authService.checkAuthentication()
            .then(null, () => {
              $state.go('main.login');
            });
        }
      }
    })
    .state('main.with-auth.settings', {
      url: '/settings',
      templateUrl: 'app/routes/settings/settings.html'
    })
    .state('main.with-auth.me', {
      url: '/me',
      templateUrl: 'app/routes/me/me.html'
    })
    .state('main.with-auth.characters', {
      url: '/me/characters',
      templateUrl: 'app/routes/me/characters/characters.html'
    });

	$locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/404');
}

export default routerConfig;

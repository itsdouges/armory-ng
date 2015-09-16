'use strict';

function routerConfig ($stateProvider, $urlRouterProvider, $locationProvider) {
  'ngInject';
  
  $stateProvider
    .state('main', {
      templateUrl: 'app/routes/main.html',
      abstract: true
    })
    .state('main.no-auth', {
      abstract: true,
      template: '<ui-view></ui-view>',
      resolve: {
        authenticated: function (authService, $q) {
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
      templateUrl: 'app/routes/home/home.html',
    })
    .state('main.no-auth.with-container.login', {
      url: '/login',
      templateUrl: 'app/routes/login/login.html'
    })
    .state('main.no-auth.with-container.signup', {
      url: '/signup',
      templateUrl: 'app/routes/signup/signup.html'
    })
    .state('main.no-auth.not-found', {
      url: '/404',
      templateUrl: 'app/routes/404/404.html'
    })
    .state('main.with-auth', {
      abstract: true,
      template: '<ui-view></ui-view>',
      resolve: {
        authenticated: function (authService, $state) {
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
      templateUrl: 'app/routes/settings/settings.html'
    })
    .state('main.with-auth.characters', {
      url: '/me/characters',
      templateUrl: 'app/routes/me/characters/characters.html'
    })
    .state('main.with-auth.characters.character', {
      url: '/:name'
    });

	$locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/404');
}

export default routerConfig;

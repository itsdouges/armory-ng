'use strict';

function routerConfig ($stateProvider, $urlRouterProvider, $locationProvider) {
  'ngInject';
  
  $stateProvider
    .state('main', {
      templateUrl: 'app/routes/main.html',
      abstract: true
    })
    .state('main.home', {
      url: '/',
      templateUrl: 'app/routes/home/home.html',
    })
    .state('main.login', {
      url: '/login',
      templateUrl: 'app/routes/login/login.html'
    })
    .state('main.character', {
      url: '/characters/{name}',
      templateUrl: 'app/routes/characters/characters.html'
    })
    .state('main.not-found', {
      url: '/404',
      template: 'cant find it man'
    })
    .state('main.with-auth', {
      abstract: true,
      template: '<ui-view />',
      resolve: {
        authenticated: function (authService) {
          return authService.checkAuthentication();
        }
      }
    })
    .state('main.with-auth.me', {
      url: '/me',
      templateUrl: 'app/routes/me/me.html'
    });

	$locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/404');
}

export default routerConfig;

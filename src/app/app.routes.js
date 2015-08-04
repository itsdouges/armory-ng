function routerConfig ($stateProvider, $urlRouterProvider, $locationProvider) {
  'ngInject';
  
  $stateProvider
  	.state('auth', {
			abstract: true,
			template: '<ui-view />'
  	})
    .state('auth.main', {
      templateUrl: 'app/routes/main.html',
      abstract: true
    })
    .state('auth.main.login', {
      url: '/login',
      templateUrl: 'app/routes/login/login.html'
    })
    .state('auth.main.account', {
      url: '/account',
      templateUrl: 'app/routes/account/account.html'
    })
    .state('auth.main.home', {
    	url: '/',
    	templateUrl: 'app/routes/home/home.html',
    })
    .state('auth.main.character', {
      url: '/characters/{name}',
      templateUrl: 'app/routes/characters/characters.html'
    })
    .state('auth.main.not-found', {
      url: '/404',
      template: 'cant find it man'
    });

	$locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/404');
}

export default routerConfig;

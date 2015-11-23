'use strict';

import axios from 'axios';

import showToast from './actions/toast';
import { actionCreators } from './actions/user/auth';
import { userAuthSelector } from './selectors/user';
import conf from './app.env';
import stateGo from 'redux-ui-router/lib/state-go';

// @ngInject
function config ($logProvider, $compileProvider, $urlMatcherFactoryProvider) {
  // NOTE: The following line allows route/page and route/page/ to be redirected to the same route.
  $urlMatcherFactoryProvider.strictMode(false)

  if (__DEV__) {
    $logProvider.debugEnabled(conf.verbose);
  }
  
  if (__PROD__) {
    $compileProvider.debugInfoEnabled(false);
  }
}

// @ngInject
function run ($ngRedux, $state, $window, $rootScope, $location) {
	axios.interceptors.request.use((config) => {
		const userAuth = userAuthSelector($ngRedux.getState());
		if (userAuth.token && !config.ignoreAuth) {
			config.headers.Authorization = userAuth.token;
		}

	  return config;
	});

	axios.interceptors.response.use(null, (response) => {
    	if (response instanceof Error || response.status === 0) {
          console.error('Error', response);
          $ngRedux.dispatch(showToast('We\'re having trouble talking to the server. It might be down! But check your connection just incase.'));
        } else if (response.status === 401 && response.config.url.indexOf(conf.api.endpoint) >= 0 && response.config.url.indexOf('token') === -1) {
        	// unauthorized
        	$ngRedux.dispatch(actionCreators.clearUserData());
          $ngRedux.dispatch(showToast('Sorry I\'ve lost you! Can you please login again?'));
          $ngRedux.dispatch(stateGo('main.no-auth.with-container.login'));
        } else if (response.status === 403) {
        	// forbidden
        	$ngRedux.dispatch(stateGo('main.with-auth.forbidden'));
        } else if (response.status === 404) {
        	// not found
          if (response.config.url.indexOf(conf.api.endpoint) === -1) {
            $ngRedux.dispatch(showToast('Ahh.. whatever you\'re looking for.. we can\'t find it..'));
          } else {
            $state.go('main.no-auth.with-container.not-found');
          }
        } else if (response.status >= 500) {
        	// server error
        	$ngRedux.dispatch(showToast('Sorry.. Some wierd stuff is happening on the server, wait a bit and try again!'));
        }

        return Promise.reject(response);
	});

  function penfold (id, path) {
    if (!id) {
      return;
    }

    var er = encodeURIComponent;
    var url =   '?ua=' + er($window.navigator.userAgent) +
                '&an=' + er($window.navigator.appName) +
                '&re=' + er(document.referrer) +
                '&sh=' + er(screen.height) +
                '&sw=' + er(screen.width) +
                '&os=' + er(navigator.oscpu) +
                '&pl=' + er(navigator.platform) +
                '&hr=' + er($window.location.href) +
                '&si=' + id;

    var img = document.createElement('img');
    img.src = '//portfold.com/track/' + url;
    img.style.cssText = 'display:none;'
    img.width = '1';
    img.height = '1';
    var src = document.getElementsByTagName('script')[0];
    src.appendChild(img);
    img.remove();
  }

  $rootScope.$on('$stateChangeSuccess', (event) => {
    if (!$window.ga) {
      return;
    }

    $window.ga('send', 'pageview', { 
      page: $location.path() 
    });

    penfold(conf.penfoldId, $location.absUrl());
  });
}

export default {
	config,
	run
}

// how to run in prod https://docs.angularjs.org/guide/production
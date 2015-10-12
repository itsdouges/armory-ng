'use strict';

import axios from 'axios';

import showToast from './actions/toast';
import { userAuthSelector } from './selectors/user';
import conf from '../generated/app.env';
import stateGo from 'redux-ui-router/lib/state-go';

function config ($logProvider) {
  $logProvider.debugEnabled(conf.verbose);
}

function run ($ngRedux) {
	axios.interceptors.request.use((config) => {
		const userAuth = userAuthSelector($ngRedux.getState());
		if (userAuth.token && !config.ignoreAuth) {
			config.headers.Authorization = userAuth.token;
		}

	  return config;
	});

	axios.interceptors.response.use(null, (response) => {
		if (response instanceof Error || response.status === 0) {
      console.log('Error', response);
      $ngRedux.dispatch(showToast('We\'re having trouble talking to the server. It might be down! But check your connection just incase.'));
    } else if (response.status === 401 && response.config.url.indexOf(conf.api.endpoint) >= 0) {
    	// unauthorized
    	$ngRedux.dispatch(stateGo('main.no-auth.with-container.login'));
    	return;
    } else if (response.status === 403) {
    	// forbidden
    	$ngRedux.dispatch(stateGo('main.with-auth.forbidden'));
    	return;
    } else if (response.status === 404) {
    	// not found
    	$ngRedux.dispatch(showToast('Ahh.. whatever you\'re looking for.. we can\'t find it..'));
    } else if (response.status >= 500) {
    	// server error
    	$ngRedux.dispatch(showToast('Sorry.. Some wierd stuff is happening on the server, wait a bit and try again!'));
    }

	  return Promise.reject(error);
	});
}

export default {
	config,
	run
}

// how to run in prod https://docs.angularjs.org/guide/production
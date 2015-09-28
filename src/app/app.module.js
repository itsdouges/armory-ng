'use strict';

import { polyfill } from 'es6-promise';
polyfill();

import configuration from './app.config';
import routerConfig from './app.routes';
import environment from '../generated/app.env';

import ColumnsCalculator from './directives/columns-calculator';
import CharactersSlider from './components/smart/characters-slider';
import ProgressIndicator from './components/dumb/progress-indicator';
import CharacterViewer from './components/smart/character-viewer';
import Gw2Token from './components/dumb/gw2-token';
import Spacer from './components/smart/spacer';
import UserLinks from './components/dumb/user-links';
import UserTokens from './components/smart/user-tokens';
import ChangeAlias from './components/smart/change-alias';
import ChangePassword from './components/smart/change-password';
import CharacterPortrait from './components/dumb/character-portrait';
import CharacterHeadshot from './components/dumb/character-headshot';
import GuildBlock from './components/dumb/guild-block';
import HeaderBlock from './components/smart/header';
import Footer from './components/smart/footer';
import CraftingBlock from './components/dumb/crafting-block';
import ItemBlock from './components/dumb/item-block';
import ItemTooltip from './components/smart/item-tooltip';
import LoginBox from './components/smart/login-box';
import BusyButton from './components/dumb/busy-button';
import RegisterBox from './components/smart/register-box';
import InputValidity from './components/dumb/input-validity';
import ItemUpgrade from './components/dumb/item-upgrade';
import MouseFollow from './directives/mouse-follow';
import CharacterAttributes from './components/dumb/character-attributes';

import AuthService from './services/auth/auth';
import debounce from './services/helpers/debouncer';

import angular from 'angular';
import ngRedux from 'ng-redux';
import uiRouter from 'angular-ui-router';
import ngReduxRouter from 'redux-ui-router';

import reducers from './reducers';
import { combineReducers } from 'redux';
import store from './app.redux-store';

const App = angular.module('gw2armory', [
	ngRedux,
  uiRouter,
  ngReduxRouter
])

.config(configuration.config)
.config(routerConfig)
.config(store)

.constant('env', environment)

.run(configuration.run)

.service('authService', AuthService)
.service('debounce', debounce)

.directive('columnsCalculator', ColumnsCalculator)
.directive('mouseFollow', MouseFollow)
.directive('characterAttributes', CharacterAttributes)
.directive('itemBlock', ItemBlock)
.directive('spacer', Spacer)
.directive('busyButton', BusyButton)
.directive('itemTooltip', ItemTooltip)
.directive('progressIndicator', ProgressIndicator)
.directive('charactersSlider', CharactersSlider)
.directive('characterViewer', CharacterViewer)
.directive('gw2Token', Gw2Token)
.directive('userTokens', UserTokens)
.directive('userLinks', UserLinks)
.directive('changeAlias', ChangeAlias)
.directive('changePassword', ChangePassword)
.directive('guildBlock', GuildBlock)
.directive('upgradeComponent', ItemUpgrade)
.directive('inputValidity', InputValidity)
.directive('header', HeaderBlock)
.directive('footer', Footer)
.directive('craftingBlock', CraftingBlock)
.directive('loginBox', LoginBox)
.directive('registerBox', RegisterBox)
.directive('characterHeadshot', CharacterHeadshot)
.directive('characterPortrait', CharacterPortrait);
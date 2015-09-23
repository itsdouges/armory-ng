'use strict';

import { polyfill } from 'es6-promise';
polyfill();

import configuration from './app.config';
import routerConfig from './app.routes';
import environment from '../generated/app.env';

import ColumnsCalculatorDirective from './directives/columns-calculator';

import CharactersSliderController from './components/smart/characters-slider/controller';
import CharactersSliderDirective from './components/smart/characters-slider/directive';

import ProgressIndicatorController from './components/dumb/progress-indicator/controller';
import ProgressIndicatorDirective from './components/dumb/progress-indicator/directive';

import CharacterViewerController from './components/smart/character-viewer/controller';
import CharacterViewerDirective from './components/smart/character-viewer/directive';

import Gw2TokenController from './components/dumb/gw2-token/controller';
import Gw2TokenDirective from './components/dumb/gw2-token/directive';

import UserLinksController from './components/dumb/user-links/controller';
import UserLinksDirective from './components/dumb/user-links/directive';

import UserTokensController from './components/smart/user-tokens/controller';
import UserTokensDirective from './components/smart/user-tokens/directive';

import ChangeAliasController from './components/smart/change-alias/controller';
import ChangeAliasDirective from './components/smart/change-alias/directive';

import ChangePasswordController from './components/smart/change-password/controller';
import ChangePasswordDirective from './components/smart/change-password/directive';

import CharacterPortraitController from './components/dumb/character-portrait/controller';
import CharacterPortraitDirective from './components/dumb/character-portrait/directive';

import CharacterHeadshotController from './components/dumb/character-headshot/controller';
import CharacterHeadshotDirective from './components/dumb/character-headshot/directive';

import GuildBlockController from './components/dumb/guild-block/controller';
import GuildBlockDirective from './components/dumb/guild-block/directive';

import HeaderBlockController from './components/smart/header/controller';
import HeaderBlockDirective from './components/smart/header/directive';

import FooterController from './components/dumb/footer/controller';
import FooterDirective from './components/dumb/footer/directive';

import CraftingBlockController from './components/dumb/crafting-block/controller';
import CraftingBlockDirective from './components/dumb/crafting-block/directive';

import ItemController from './components/smart/item-block/controller';
import ItemDirective from './components/smart/item-block/directive';

import ItemTooltipDirective from './components/smart/item-tooltip/directive';
import ItemTooltipController from './components/smart/item-tooltip/controller';

import LoginDirective from './components/smart/login-box/directive';
import LoginController from './components/smart/login-box/controller';

import BusyButtonDirective from './components/dumb/busy-button/directive';
import BusyButtonController from './components/dumb/busy-button/controller';

import RegisterDirective from './components/smart/register-box/directive';
import RegisterController from './components/smart/register-box/controller';

import InputValidityDirective from './components/dumb/input-validity/directive';
import InputValidityController from './components/dumb/input-validity/controller';

import UpgradeComponentDirective from './components/dumb/upgrade-component/directive';
import UpgradeComponentController from './components/dumb/upgrade-component/controller';

import MouseFollowDirective from './directives/mouse-follow';

import AuthService from './services/auth/auth';
import debounce from './services/helpers/debouncer';

import 'angular';
import ngRedux from 'ng-redux';
import uiRouter from 'angular-ui-router';
import ngReduxRouter from 'redux-ui-router';

import reducers from './reducers';
import { combineReducers } from 'redux';
import store from './app.redux-store';

angular.module('gw2armory', [
	ngRedux,
  uiRouter,
  ngReduxRouter
  // 'ngAnimate' // TODO: This is affecting a few ng-if/off that I don't want to. Find a work around.
])

.config(configuration.config)
.config(routerConfig)
.config(store)

.constant('env', environment)

.run(configuration.run)

.service('authService', AuthService)
.service('debounce', debounce)

.directive('columnsCalculator', ColumnsCalculatorDirective)
.directive('mouseFollow', MouseFollowDirective)

.controller('ItemBlockController', ItemController)
.directive('itemBlock', ItemDirective)

.controller('BusyButtonController', BusyButtonController)
.directive('busyButton', BusyButtonDirective)

.controller('ItemTooltipController', ItemTooltipController)
.directive('itemTooltip', ItemTooltipDirective)

.controller('ProgressIndicatorController', ProgressIndicatorController)
.directive('progressIndicator', ProgressIndicatorDirective)

.controller('CharactersSliderController', CharactersSliderController)
.directive('charactersSlider', CharactersSliderDirective)

.controller('CharacterViewerController', CharacterViewerController)
.directive('characterViewer', CharacterViewerDirective)

.controller('Gw2TokenController', Gw2TokenController)
.directive('gw2Token', Gw2TokenDirective)

.controller('UserTokensController', UserTokensController)
.directive('userTokens', UserTokensDirective)

.controller('UserLinksController', UserLinksController)
.directive('userLinks', UserLinksDirective)

.controller('ChangeAliasController', ChangeAliasController)
.directive('changeAlias', ChangeAliasDirective)

.controller('ChangePasswordController', ChangePasswordController)
.directive('changePassword', ChangePasswordDirective)

.controller('GuildBlockController', GuildBlockController)
.directive('guildBlock', GuildBlockDirective)

.controller('UpgradeComponentController', UpgradeComponentController)
.directive('upgradeComponent', UpgradeComponentDirective)

.controller('InputValidityController', InputValidityController)
.directive('inputValidity', InputValidityDirective)

.controller('HeaderController', HeaderBlockController)
.directive('header', HeaderBlockDirective)

.controller('FooterController', FooterController)
.directive('footer', FooterDirective)

.controller('CraftingBlockController', CraftingBlockController)
.directive('craftingBlock', CraftingBlockDirective)

.controller('LoginController', LoginController)
.directive('loginBox', LoginDirective)

.controller('RegisterController', RegisterController)
.directive('registerBox', RegisterDirective)

.controller('CharacterHeadshotController', CharacterHeadshotController)
.directive('characterHeadshot', CharacterHeadshotDirective)

.controller('CharacterPortraitController', CharacterPortraitController)
.directive('characterPortrait', CharacterPortraitDirective);
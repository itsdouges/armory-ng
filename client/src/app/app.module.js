'use strict';

// TODO: Split this up into angular modules. This file is getting too big !

import configuration from './app.config';
import routerConfig from './app.routes';
import environment from '../generated/app.env';
import httpAuthInterceptor from './interceptors/http-auth-interceptor';

import CharactersSliderController from './components/characters-slider/controller';
import CharactersSliderDirective from './components/characters-slider/directive';

import ProgressIndicatorController from './components/progress-indicator/controller';
import ProgressIndicatorDirective from './components/progress-indicator/directive';

import CharacterViewerController from './components/character-viewer/controller';
import CharacterViewerDirective from './components/character-viewer/directive';

import Gw2TokenController from './components/gw2-token/controller';
import Gw2TokenDirective from './components/gw2-token/directive';

import UserStatusController from './components/user-status/controller';
import UserStatusDirective from './components/user-status/directive';

import UserTokensController from './components/user-tokens/controller';
import UserTokensDirective from './components/user-tokens/directive';

import ChangeAliasController from './components/change-alias/controller';
import ChangeAliasDirective from './components/change-alias/directive';

import ChangePasswordController from './components/change-password/controller';
import ChangePasswordDirective from './components/change-password/directive';

import CharacterPortraitController from './components/character-portrait/controller';
import CharacterPortraitDirective from './components/character-portrait/directive';

import CharacterHeadshotController from './components/character-headshot/controller';
import CharacterHeadshotDirective from './components/character-headshot/directive';

import GuildBlockController from './components/guild-block/controller';
import GuildBlockDirective from './components/guild-block/directive';

import HeaderBlockController from './components/header-block/controller';
import HeaderBlockDirective from './components/header-block/directive';

import CraftingBlockController from './components/crafting-block/controller';
import CraftingBlockDirective from './components/crafting-block/directive';

import ItemController from './components/item-block/controller';
import ItemDirective from './components/item-block/directive';

import ItemTooltipDirective from './components/item-tooltip/directive';
import ItemTooltipController from './components/item-tooltip/controller';

import LoginDirective from './components/login-box/directive';
import LoginController from './components/login-box/controller';

import BusyButtonDirective from './components/busy-button/directive';
import BusyButtonController from './components/busy-button/controller';

import RegisterDirective from './components/register-box/directive';
import RegisterController from './components/register-box/controller';

import InputValidityDirective from './components/input-validity/directive';
import InputValidityController from './components/input-validity/controller';

import UpgradeComponentDirective from './components/upgrade-component/directive';
import UpgradeComponentController from './components/upgrade-component/controller';

import MouseFollowDirective from './components/mouse-follow/directive';

import AuthService from './services/auth/auth';
import Gw2ParseService from './services/gw2/gw2-parse';
import Gw2Service from './services/gw2/gw2';
import debounce from './services/helpers/debouncer';
import UserService from './services/user/user';
import CharactersService from './services/characters/characters';

angular.module('gw2armory', [
  'ui.router',
  'ngSanitize'
])

.config(configuration.config)
.config(routerConfig)
.constant('env', environment)

.run(configuration.run)

.factory('httpAuthInterceptor', httpAuthInterceptor)

.service('gw2ParseService', Gw2ParseService)
.service('gw2Service', Gw2Service)
.service('authService', AuthService)
.service('debounce', debounce)
.service('userService', UserService)
.service('charactersService', CharactersService)

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

.controller('UserStatusController', UserStatusController)
.directive('userStatus', UserStatusDirective)

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
.directive('headerBlock', HeaderBlockDirective)

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
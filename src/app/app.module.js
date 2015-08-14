'use strict';

import config from './app.config';
import routerConfig from './app.routes';
import runBlock from './app.run';
import environment from './app.env';

import CharacterViewerController from './components/character-viewer/controller';
import CharacterViewerDirective from './components/character-viewer/directive';

import CharacterPortraitController from './components/character-portrait/controller';
import CharacterPortraitDirective from './components/character-portrait/directive';

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

import AuthService from './services/auth/auth'
import CharacterService from './services/character';
import MessageService from './services/message';
import BusyService from './services/busy';
import Gw2ApiService from './services/gw2-api';
import debounce from './services/helpers/debouncer';
import RegistrationService from './services/registration/registration';

angular.module('gw2armory', [
  'ui.router',
  'ngSanitize'
])

.config(config)
.config(routerConfig)
.constant('env', environment)

.run(runBlock)

.service('characterService', CharacterService)
.service('messageService', MessageService)
.service('busyService', BusyService)
.service('gw2ApiService', Gw2ApiService)
.service('authService', AuthService)
.service('debounce', debounce)
.service('registrationService', RegistrationService)

.directive('mouseFollow', MouseFollowDirective)

.controller('ItemBlockController', ItemController)
.directive('itemBlock', ItemDirective)

.controller('BusyButtonController', BusyButtonController)
.directive('busyButton', BusyButtonDirective)

.controller('ItemTooltipController', ItemTooltipController)
.directive('itemTooltip', ItemTooltipDirective)

.controller('CharacterViewerController', CharacterViewerController)
.directive('characterViewer', CharacterViewerDirective)

.controller('GuildBlockController', GuildBlockController)
.directive('guildBlock', GuildBlockDirective)

.controller('UpgradeComponentController', UpgradeComponentController)
.directive('upgradeComponent', UpgradeComponentDirective)

.controller('InputValidityController', InputValidityController)
.directive('inputValidity', InputValidityDirective)

.controller('HeaderBlockController', HeaderBlockController)
.directive('headerBlock', HeaderBlockDirective)

.controller('CraftingBlockController', CraftingBlockController)
.directive('craftingBlock', CraftingBlockDirective)

.controller('LoginController', LoginController)
.directive('loginBox', LoginDirective)

.controller('RegisterController', RegisterController)
.directive('registerBox', RegisterDirective)

.controller('CharacterPortraitController', CharacterPortraitController)
.directive('characterPortrait', CharacterPortraitDirective);
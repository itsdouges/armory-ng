import config from './app.config';
import routerConfig from './app.routes';
import runBlock from './app.run';

import CharacterViewerController from './components/character-viewer/controller';
import CharacterViewerDirective from './components/character-viewer/directive';

import CharacterPortraitController from './components/character-portrait/controller';
import CharacterPortraitDirective from './components/character-portrait/directive';

import GuildBlockController from './components/guild-block/controller';
import GuildBlockDirective from './components/guild-block/directive';

import CraftingBlockController from './components/crafting-block/controller';
import CraftingBlockDirective from './components/crafting-block/directive';

import ItemController from './components/item-holder/controller';
import ItemDirective from './components/item-holder/directive';
import ItemTooltipDirective from './components/item-tooltip/directive';

import MouseFollowDirective from './components/mouse-follow/directive';

import CharacterService from './services/character';
import MessageService from './services/message';
import BusyService from './services/busy';
import Gw2ApiService from './services/gw2-api';

angular.module('gw2armory', [
  'ui.router'
])

.config(config)
.config(routerConfig)

.run(runBlock)

.service('characterService', CharacterService)
.service('messageService', MessageService)
.service('busyService', BusyService)
.service('gw2ApiService', Gw2ApiService)

.directive('mouseFollow', MouseFollowDirective)

.controller('ItemHolderController', ItemController)
.directive('itemHolder', ItemDirective)
.directive('itemTooltip', ItemTooltipDirective)

.controller('CharacterViewerController', CharacterViewerController)
.directive('characterViewer', CharacterViewerDirective)

.controller('GuildBlockController', GuildBlockController)
.directive('guildBlock', GuildBlockDirective)

.controller('CraftingBlockController', CraftingBlockController)
.directive('craftingBlock', CraftingBlockDirective)

.controller('CharacterPortraitController', CharacterPortraitController)
.directive('characterPortrait', CharacterPortraitDirective);
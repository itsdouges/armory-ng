import config from './app.config';
import routerConfig from './app.routes';

import runBlock from './app.run';

import CharacterViewerDirective from './components/character-viewer/directive';
import CharacterViewerController from './components/character-viewer/controller';
import CharacterService from './services/character';

angular.module('gw2armory', [
  'ui.router'
])

.config(config)
.config(routerConfig)

.run(runBlock)

.service('characterService', CharacterService)

.controller('CharacterViewerController', CharacterViewerController)
.directive('characterViewer', () => new CharacterViewerDirective())
;
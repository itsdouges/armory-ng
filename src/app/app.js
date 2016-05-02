import 'file!../assets/images/favicons/favicon.ico';

import 'font-awesome/css/font-awesome.css';

import { polyfill } from 'es6-promise';
polyfill();

import configuration from './app.config';
import routerConfig from './app.routes';
import environment from './app.env';

import CharacterSpecialization from './components/smart/character-specialization';
import ChangeAlias from './components/smart/change-alias';
import HeaderBlock from './components/smart/header';
import ItemTooltip from './components/smart/item-tooltip';
import LoginBox from './components/smart/login-box';
import RegisterBox from './components/smart/register-box';

import GuildPage from './components/smart/guild-page';
import UserSettingsPage from './components/smart/user-settings-page';
import CharacterPage from './components/smart/character-page';
import UserPage from './components/smart/user-page';

import Footer from './components/dumb/footer';
import SearchModal from './components/dumb/search-modal';
import Avatar from './components/dumb/avatar';
import SearchResult from './components/dumb/search-result';
import SearchBox from './components/dumb/search-box';
import BuildStats from './components/dumb/build-stats';
import ChangePassword from './components/dumb/change-password';
import UserTokens from './components/dumb/user-tokens';
import CopyToClipboard from './components/dumb/copy-to-clipboard';
import CharacterViewer from './components/dumb/character-viewer';
import CharactersGrid from './components/dumb/characters-grid';
import SliderControl from './components/dumb/slider-control';
import InlineCharacters from './components/dumb/inline-characters';
import ProgressIndicator from './components/dumb/progress-indicator';
import Gw2Token from './components/dumb/gw2-token';
import UserLinks from './components/dumb/user-links';
import CharacterPortrait from './components/dumb/character-portrait';
import CharacterHeadshot from './components/dumb/character-headshot';
import CraftingBlock from './components/dumb/crafting-block';
import ItemBlock from './components/dumb/item-block';
import BusyButton from './components/dumb/busy-button';
import InputValidity from './components/dumb/input-validity';
import ItemUpgrade from './components/dumb/item-upgrade';
import CharacterAttributes from './components/dumb/character-attributes';
import SpecializationTrait from './components/dumb/specialization-trait';
import Toast from './components/dumb/toast';
import SocialButtons from './components/dumb/social-buttons';
import Textbox from './components/dumb/textbox';

import ModalWatcher from './directives/modal-watcher';
import Title from './directives/title';
import MouseFollow from './directives/mouse-follow';
import ColumnsCalculator from './directives/columns-calculator';
import ToastCreator from './directives/toast-creator';

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

.run(configuration.run)

.service('authService', AuthService)
.service('debounce', debounce)

.directive('modalWatcher', ModalWatcher)
.directive('searchModal', SearchModal)
.directive('searchResult', SearchResult)
.directive('guildPage', GuildPage)
.directive('avatar', Avatar)
.directive('searchBox', SearchBox)
.directive('title', Title)
.directive('buildStats', BuildStats)
.directive('copyToClipboard', CopyToClipboard)
.directive('socialButtons', SocialButtons)
.directive('characterPage', CharacterPage)
.directive('userPage', UserPage)
.directive('userSettingsPage', UserSettingsPage)
.directive('columnsCalculator', ColumnsCalculator)
.directive('mouseFollow', MouseFollow)
.directive('characterAttributes', CharacterAttributes)
.directive('itemBlock', ItemBlock)
.directive('busyButton', BusyButton)
.directive('itemTooltip', ItemTooltip)
.directive('progressIndicator', ProgressIndicator)
.directive('charactersGrid', CharactersGrid)
.directive('sliderControl', SliderControl)
.directive('inlineCharacters', InlineCharacters)
.directive('characterViewer', CharacterViewer)
.directive('gw2Token', Gw2Token)
.directive('userTokens', UserTokens)
.directive('userLinks', UserLinks)
.directive('changeAlias', ChangeAlias)
.directive('changePassword', ChangePassword)
.directive('upgradeComponent', ItemUpgrade)
.directive('inputValidity', InputValidity)
.directive('header', HeaderBlock)
.directive('footer', Footer)
.directive('craftingBlock', CraftingBlock)
.directive('loginBox', LoginBox)
.directive('registerBox', RegisterBox)
.directive('characterHeadshot', CharacterHeadshot)
.directive('characterPortrait', CharacterPortrait)
.directive('specializationTrait', SpecializationTrait)
.directive('toast', Toast)
.directive('toastsEnabled', ToastCreator)
.directive('textbox', Textbox)
.directive('characterSpecialization', CharacterSpecialization);

angular.bootstrap(document, ['gw2armory'], {
  strictDi: true
});
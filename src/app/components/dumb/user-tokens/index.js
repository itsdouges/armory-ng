'use strict';

import styles from './user-tokens.less';
import messageStyles from '../../../styles/message/message.less';
import formStyles from '../../../styles/forms/forms.less';

function component () {
	let directive = {
		restrict: 'E',
		controller: UserTokens,
		controllerAs: 'ctrl',
		scope: {},
		bindToController: {
			validateToken: '&',
			validToken: '=',
			validatingToken: '=',
			addingToken: '=',
			addToken: '&',
			removeToken: '&',
			tokens: '='
		},
		template: `
			<div class="${messageStyles.message}">
				Need api tokens? <a target="_blank" title="Opens in a new window" href="https://account.arena.net/applications/create"><strong>Head over to ArenaNet's applications page and create some <i class="fa fa-external-link"></i></strong></a> selecting the permissions you'd like. We suggest characters, inventories, builds, wallet, and pvp.
			</div>

			<gw2-token 
				remove-token="ctrl.removeToken({ token: token })"
				ng-repeat="token in ctrl.tokens"
				token="token"
				mode="view">
			</gw2-token>

			<form ng-submit="ctrl.addToken({ token: ctrl.newGw2Token })">
				<div class="${formStyles.labelContainer}">
					<label for="add-token">Add token</label>
				</div>

				<div class="${formStyles.inputContainer}">
					<input 
						placeholder="Add token" 
						ng-disabled="ctrl.addingToken" 
						ng-change="ctrl.validateTokenDebounce()" 
						id="add-token" 
						type="text" 
						ng-model="ctrl.newGw2Token" 
						required="required" />

					<input-validity
						data-busy="ctrl.validatingToken"
						data-valid="ctrl.validToken">
					</input-validity>
				</div>

				<div class="${formStyles.buttonGroup}">
					<busy-button 
						button-disabled="!ctrl.validToken" 
						busy="ctrl.addingToken">
						<i class="fa fa-plus"></i>
					</busy-button>
				</div>
			</form>
		`
	};

	return directive;
}

// @ngInject
function UserTokens (debounce) {
	let that = this;

	// Angular directives passing functions around........ smh..
	that.validateToken = that.validateToken();
	that.addToken = that.addToken();
	that.removeToken = that.removeToken();

	let tokenDebounce;
	that.validateTokenDebounce = () => {
		tokenDebounce = tokenDebounce || debounce.func(() => {
			that.validateToken({ token: that.newGw2Token });
		});

		tokenDebounce();
	};
}

export default component;
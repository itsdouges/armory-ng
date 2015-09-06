'use strict';

function HeaderController(authService) {
	this.isAuthenticated = authService.isAuthenticated;
}

export default HeaderController;
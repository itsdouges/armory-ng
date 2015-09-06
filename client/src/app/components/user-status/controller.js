'use strict';

function UserStatusController (authService, userService, $scope) {
	let scope = this;

	this.isAuthenticated = authService.isAuthenticated;

	// this.getUserData = () => {
	// 	userService.readMe()
	// 		.then(function (data) {
	// 			console.log(data);
	// 			scope.user = data;
	// 		});
	// };

	this.logout = () => {
		authService.logout();
	};

	// this.getUserData();
}

export default UserStatusController;
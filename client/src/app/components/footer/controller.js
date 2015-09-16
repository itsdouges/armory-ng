'use strict';

function FooterController(authService) {
	let that = this;

	this.setSpacerStyle = (height) => {
		that.footerSpacerStyle = {
			height: `${height}px`
		};
	};

	this.setSpacerStyle(130);
}

export default FooterController;
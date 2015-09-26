'use strict';

import { actionCreators } from '../../../actions/window';

function Footer ($ngRedux) {
	this.setSpacerHeight = (height) => {
		$ngRedux.dispatch(actionCreators.setBottomSpacer(height));
	};
}

export default Footer;
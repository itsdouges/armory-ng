'use strict';

import { spacerSelector } from '../../../selectors/window';

function Spacer ($ngRedux, $scope) {
	const unsubscribe = $ngRedux.connect(spacerSelector)(this);
	$scope.$on('$destroy', unsubscribe);
}

export default Spacer;
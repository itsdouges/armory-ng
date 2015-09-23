'use strict';

function InputValidityDirective() {
	let directive = {
		restrict: 'E',
		controller: 'InputValidityController as ctrl',
		bindToController: {
			valid: '=',
			busy: '='
		},
		scope: {},
		templateUrl: 'app/components/dumb/input-validity/view.html',
	};

	return directive;
}

export default InputValidityDirective;
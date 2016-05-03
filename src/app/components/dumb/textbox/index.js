import forms from '../../../styles/forms/forms.less';
import styles from './textbox.less';

function component () {
  let directive = {
    restrict: 'E',
    controller: Textbox,
    controllerAs: 'textbox',
    scope: {},
    bindToController: {
      label: '@',
      controlId: '@',
      onChange: '&',
      ngModel: '=',
      required: '@',
      isBusy: '=',
      isValid: '=',
      type: '@',
      error: '=',
    },
    template: `
      <div>
        <div class="${styles.labelContainer}">
          <label for="{{ textbox.controlId }}">{{ textbox.label }}</label>
        </div>

        <div class="${styles.textboxContainer}">
          <input
            placeholder="{{ textbox.label }}"
            ng-change="textbox.onChange()"
            id="{{ textbox.controlId }}"
            type="{{ textbox.type }}"
            ng-model="textbox.ngModel"
            ng-required="{{ textbox.required ? 'required': '' }}" />

          <input-validity
            data-busy="textbox.isBusy"
            data-valid="textbox.isValid">
          </input-validity>

          <div title="{{ textbox.error }}" class="${styles.error}" ng-if="textbox.error">
            {{ textbox.error }}
          </div>
        </div>
      </div>
    `
  };

  return directive;
}

class Textbox {
  constructor () {
    this.onChange = this.onChange();
    this.type = this.type || 'text';
  }
}

export default component;

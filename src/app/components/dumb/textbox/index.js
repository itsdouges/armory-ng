import { Component } from '@angular/core';
import styles from './textbox.less';
import InputValidity from '../input-validity';

@Component({
  selector: 'textbox',
  inputs: ['label', 'errorMessage', 'busy', 'valid', 'required', 'id', 'onChange', 'type'],
  directives: [InputValidity],
  template: `
<div>
  <div class="${styles.labelContainer}">
    <label [attr.for]="id">{{ label }}</label>
  </div>

  <div class="${styles.textboxContainer}">
    <input
      [placeholder]="label"
      [attr.id]="id"
      [attr.type]="type || 'text'"
      [attr.required]="required"
      (change)="onChange($event.target.value)" />

    <input-validity
      [busy]="busy"
      [valid]="valid">
    </input-validity>

    <div
      [title]="errorMessage"
      class="${styles.error}">
      {{ busy ? '...' : errorMessage }}
    </div>
  </div>
</div>
`,
})
export default class Textbox {}

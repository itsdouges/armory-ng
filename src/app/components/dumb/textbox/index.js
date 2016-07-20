import { Component, EventEmitter, Output, Input } from '@angular/core';
import styles from './textbox.less';
import InputValidity from '../input-validity';

@Component({
  selector: 'textbox',
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
      [(ngModel)]="value"
      (ngModelChange)="onModelChange($event)" />

    <input-validity
      *ngIf="!noValidation"
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
export default class Textbox {
  @Input() label = '';
  @Input() errorMessage = '';
  @Input() valid = false;
  @Input() required = false;
  @Input() busy = false;
  @Input() id = '';
  @Input() onChange = undefined;
  @Input() type = '';
  @Input() noValidation = false;
  @Input() value = '';
  @Output() valueChange = new EventEmitter();

  onModelChange (value) {
    this.onChange && this.onChange(value);
    this.valueChange.emit(value);
  }
}

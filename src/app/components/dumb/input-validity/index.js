import { Component } from '@angular/core';
import styles from './input-validity.less';
import ProgressIndicator from '../progress-indicator';

@Component({
  selector: 'input-validity',
  inputs: ['valid'],
  template: `
<div class="${styles.container}">
  <i [attr.class]="valid ? 'fa fa-check ${styles.valid}' : 'fa fa-times ${styles.invalid}'"></i>
</div>
`,
})
export default class InputValidity {} 

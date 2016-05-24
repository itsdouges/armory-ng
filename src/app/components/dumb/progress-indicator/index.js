import { Component } from '@angular/core';
import styles from './progress-indicator.less';
import iconStyles from '../../../styles/icons/icons.less';
import accessibilityStyles from '../../../styles/helpers/accessibility.less';
import { NgClass } from '@angular/common';

@Component({
  selector: 'progress-indicator',
  inputs: ['busy', 'size'],
  directives: [NgClass],
  template: `
<i
  *ngIf="busy"
  [ngClass]="getStyle()"
  class="${iconStyles.icon} ${styles.progress}">
  <span class="${accessibilityStyles.hideText}">Loading..</span>
</i>
`,
})
export default class ProgressIndicator {
  getStyle () {
    return styles[this.size || 'small'];
  }
}

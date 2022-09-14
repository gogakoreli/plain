import { TemplateRef } from '@angular/core';
import { DialogConfig } from '../dialog';

export interface ConfirmationDialogData {
  /** Dialog's optional header title */
  title?: string;
  /** Dialog's array of messages. Can provide TemplateRef, normal string or html template string for innerHtml binding */
  messages: (TemplateRef<unknown> | string)[];
  /** Show close button on top right corner. True by default */
  showCloseButton?: boolean;
  /** Close timeout. Automatically closes after timeout defined in milliseconds, disabled by default */
  closeTimeout?: number;
  /** Primary button text*/
  primaryButtonText?: string;
  /** Primary button type. */
  primaryButtonClasses?: string[];
  /** Secondary button text*/
  secondaryButtonText?: string;
  /** Secondary button type. */
  secondaryButtonClasses?: string[];
}

export interface ConfirmationDialogConfig
  extends DialogConfig<ConfirmationDialogData> {
  data: ConfirmationDialogData;
}

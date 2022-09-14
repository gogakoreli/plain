import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { DialogButtons, DialogRef, DIALOG_DATA } from '../dialog';
import { ConfirmationDialogData } from './confirmation-dialog';

@Component({
  selector: 'plain-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmationDialogComponent {

  public get hasPrimaryButton(): boolean {
    return !!this.data.primaryButtonText;
  }

  public get hasSecondaryButton(): boolean {
    return !!this.data.secondaryButtonText;
  }

  public primaryButtonClasses: string[] = this.data.primaryButtonClasses ?? [];
  public secondaryButtonClasses: string[] = this.data.secondaryButtonClasses ?? [];

  constructor(
    @Inject(DIALOG_DATA) public data: ConfirmationDialogData,
    private dialogRef: DialogRef<boolean>,
  ) {
    this.data.messages = this.data.messages.filter(message => !!message);
    if (this.data.closeTimeout) {
      setTimeout(() => this.close(false), this.data.closeTimeout);
    }
    // if the primary and secondary button classes array do not have any -button classes, add default button class
    const buttonRegex = /-button/g;
    const primaryCTAHasButtonClass = this.primaryButtonClasses.some(primaryButtonClass => buttonRegex.test(primaryButtonClass));
    if (!primaryCTAHasButtonClass) {
      this.primaryButtonClasses.push(DialogButtons.TYPE.DEFAULT);
    }
    const secondaryCTAHasButtonClass = this.secondaryButtonClasses.some(secondaryButtonClass => buttonRegex.test(secondaryButtonClass));
    if (!secondaryCTAHasButtonClass && this.hasSecondaryButton) {
      this.secondaryButtonClasses.push(DialogButtons.TYPE.DEFAULT);
    }
  }

  public close(result: boolean): void {
    this.dialogRef.close(result);
  }

  public isTemplate(message: string | TemplateRef<unknown>): message is TemplateRef<unknown> {
    return message instanceof TemplateRef;
  }

}

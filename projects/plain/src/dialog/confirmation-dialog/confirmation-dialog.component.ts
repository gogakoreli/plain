import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '../dialog';
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

  public data = inject<ConfirmationDialogData>(DIALOG_DATA);

  public get hasPrimaryButton(): boolean {
    return !!this.data.primaryButtonText;
  }

  public get hasSecondaryButton(): boolean {
    return !!this.data.secondaryButtonText;
  }

  public primaryButtonClasses: string[] = this.data.primaryButtonClasses ?? [];
  public secondaryButtonClasses: string[] = this.data.secondaryButtonClasses ?? [];

  private dialogRef: DialogRef<boolean> = inject(DialogRef);

  constructor() {
    this.data.messages = this.data.messages.filter(message => !!message);
  }

  public close(result: boolean): void {
    this.dialogRef.close(result);
  }

  public isTemplate(message: string | TemplateRef<unknown>): message is TemplateRef<unknown> {
    return message instanceof TemplateRef;
  }

}

import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { DialogConfig, DialogRef, DIALOG_CONFIG } from './dialog';

@Component({
  selector: 'plain-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss'],
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class DialogContainerComponent {

  public containerStyle: Record<string, string | undefined>;

  public dialogStyle: Record<string, string | undefined>;

  public hasBackdrop = true;

  private dialogRef = inject(DialogRef);

  private config = inject(DIALOG_CONFIG);

  constructor() {
    this.containerStyle = this.getContainerStyle(this.config);
    this.dialogStyle = this.getDialogStyle(this.config);
    this.hasBackdrop = this.config.hasBackdrop ?? true;
  }

  public backdropClick(): void {
    // if config.closeOnBackdropClick is not provided, it will be enabled by default
    const closeOnBackdropClick = this.config.closeOnBackdropClick === true ||
      this.config.closeOnBackdropClick === undefined;
    if (closeOnBackdropClick) {
      this.dialogRef.close();
    }
  }

  public getContainerStyle(
    config: DialogConfig
  ): Record<string, string | undefined> {
    const alignLeft: boolean =
      config.position !== undefined && config.position.left !== undefined;
    const alignRight: boolean =
      config.position !== undefined && config.position.right !== undefined;
    const justifyContent = alignLeft
      ? 'flex-start'
      : alignRight
        ? 'flex-end'
        : 'center';

    const alignTop: boolean =
      config.position !== undefined && config.position.top !== undefined;
    const alignBottom: boolean =
      config.position !== undefined && config.position.bottom !== undefined;
    const alignItems = alignTop
      ? 'flex-start'
      : alignBottom
        ? 'flex-end'
        : 'center';

    return {
      'align-items': alignItems,
      'justify-content': justifyContent
    };
  }

  public getDialogStyle(
    config: DialogConfig
  ): Record<string, string | undefined> {
    const marginLeft: string | undefined =
      config.position !== undefined && config.position.left !== undefined
        ? config.position.left
        : undefined;
    const marginRight: string | undefined =
      config.position !== undefined && config.position.right !== undefined
        ? config.position.right
        : undefined;
    const marginTop: string | undefined =
      config.position !== undefined && config.position.top !== undefined
        ? config.position.top
        : undefined;
    const marginBottom: string | undefined =
      config.position !== undefined && config.position.bottom !== undefined
        ? config.position.bottom
        : undefined;

    return {
      width: config.width,
      'max-width': config.maxWidth,
      'min-width': config.minWidth,
      height: config.height,
      'max-height': config.maxHeight,
      'min-height': config.minHeight,
      'margin-left': marginLeft,
      'margin-right': marginRight,
      'margin-top': marginTop,
      'margin-bottom': marginBottom
    };
  }
}

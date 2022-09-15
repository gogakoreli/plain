import { ElementRef, InjectionToken } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export type ComponentType<T> = new (...args: any[]) => T;

export const DIALOG_CONFIG = new InjectionToken<DialogConfig>(
  'DialogConfig'
);

export const DIALOG_DATA = new InjectionToken<unknown>('DialogData');

/** Possible overrides for a dialog's position. */
export interface DialogPosition {
  /** Override for the dialog's top position. */
  top?: string;

  /** Override for the dialog's bottom position. */
  bottom?: string;

  /** Override for the dialog's left position. */
  left?: string;

  /** Override for the dialog's right position. */
  right?: string;
}

export interface DialogConfig<D = unknown> {
  /** Data being injected into the modal component. */
  data?: D;

  /** Width of the dialog. */
  width?: string;

  /** Height of the dialog. */
  height?: string;

  /** Min-width of the dialog. */
  minWidth?: string;

  /** Min-height of the dialog. */
  minHeight?: string;

  /** Max-width of the dialog. Defaults to 80vw. */
  maxWidth?: string;

  /** Max-height of the dialog. */
  maxHeight?: string;

  /** Position overrides. */
  position?: DialogPosition;

  /** Element which will become host of dialog container */
  hostElementRef?: ElementRef;

  /** Should have the backdrop or not. True by default. */
  hasBackdrop?: boolean;

  /** Should close dialog in backdrop click. True by default. */
  closeOnBackdropClick?: boolean;

  /** Close timeout. Automatically closes after timeout defined in milliseconds, disabled by default */
  closeTimeout?: number;
}

export const DEFAULT_CONFIG: DialogConfig = {
  maxWidth: '80vw'
};

export const IN_HOST_CONFIG: DialogConfig = {
  maxWidth: '100vw',
  width: '100vw',
  position: { bottom: '0' }
};

export class DialogRef<R = unknown> {
  private closedSubject = new Subject<R | undefined>();

  constructor(private closeHandler: () => void) { }

  /**
   * close dialog component
   * @param dialogResult dialog closing result emitted to opener
   */
  public close(dialogResult?: R): void {
    this.closeHandler();
    this.closedSubject.next(dialogResult);
    this.closedSubject.complete();
  }

  /**
   * Observable that emits dialog result on dialog close
   * It will emit dialog result and complete afterwards
   */
  public afterClosed(): Observable<R | undefined> {
    return this.closedSubject.asObservable();
  }
}

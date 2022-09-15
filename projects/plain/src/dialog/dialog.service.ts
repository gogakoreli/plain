import {
  ApplicationRef, ComponentRef,
  createComponent,
  createEnvironmentInjector, inject, Injectable
} from '@angular/core';
import { ConfirmationDialogConfig } from './confirmation-dialog/confirmation-dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import {
  ComponentType, DEFAULT_CONFIG, DialogConfig,
  DialogRef, DIALOG_CONFIG,
  DIALOG_DATA,
  IN_HOST_CONFIG
} from './dialog';
import { DialogContainerComponent } from './dialog-container.component';

@Injectable({ providedIn: 'root' })
export class DialogService {

  /** Currently open modal component's dialog ref Stack, pop to get the most recent one */
  private dialogRefStack: DialogRef[] = [];

  private appRef = inject(ApplicationRef);

  /**
   * Opens a modal dialog containing the given component.
   * @param component Type of the component to load into the dialog.
   * @param config Extra configuration options.
   * @returns Reference to the newly-opened dialog.
   */
  public open<T, D = unknown, R = unknown>(
    component: ComponentType<T>,
    config: DialogConfig<D>
  ): DialogRef<R> {
    let dialogRef: DialogRef;
    let dialogContainerRef: ComponentRef<DialogContainerComponent>;
    let componentRef: ComponentRef<T>;

    config = (config.hostElementRef === undefined ?
      { ...DEFAULT_CONFIG, ...config } :
      { ...IN_HOST_CONFIG, ...config }) as DialogConfig<D>;

    let hostElement = document.body;
    if (config.hostElementRef) {
      hostElement = config.hostElementRef.nativeElement;
      // update host element stlyes
      this.updateHostElement(hostElement);
    }

    const closeHandler = (): void => {
      // clean up projected component
      this.disposeComponentRef(componentRef);
      // dispose dialog container itself
      this.disposeComponentRef(dialogContainerRef);
      // clean up host element
      if (config && config.hostElementRef) {
        this.clearHostElement(config.hostElementRef.nativeElement);
      }
      // clean up dialog ref from the stack
      this.dialogRefStack = this.dialogRefStack.filter(ref => ref !== dialogRef);
    };

    // create dialog ref and provide dispose callback
    dialogRef = new DialogRef(closeHandler);
    this.dialogRefStack.push(dialogRef);

    // create injector for dialog container
    const injector = createEnvironmentInjector([
      { provide: DIALOG_CONFIG, useValue: config },
      { provide: DialogRef, useValue: dialogRef },
      { provide: DIALOG_DATA, useValue: config.data },
    ], this.appRef.injector);

    // create a component reference
    componentRef = createComponent(component, {
      environmentInjector: injector,
    });

    // attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // create a container reference
    dialogContainerRef = createComponent(DialogContainerComponent, {
      environmentInjector: injector,
      projectableNodes: [
        [componentRef.location.nativeElement],
      ],
    });

    // attach container to the appRef so that it's inside the ng component tree
    this.appRef.attachView(dialogContainerRef.hostView);

    // append dialog container's DOM element inside the host element
    hostElement.appendChild(dialogContainerRef.location.nativeElement);

    return dialogRef as DialogRef<R>;
  }

  /**
   * Opens a confirmation modal dialog.
   * @param config configuration options.
   * @returns Reference to the newly-opened dialog.
   */
  public openConfirmation(
    config: ConfirmationDialogConfig
  ): DialogRef<boolean | undefined> {
    return this.open(ConfirmationDialogComponent, config);
  }

  /**
   * Close currently open dialog component
   */
  public close(): void {
    const dialogRef = this.dialogRefStack.pop();
    // close through dialog ref so that subscribers are notified properly
    if (dialogRef) {
      dialogRef.close();
    }
  }

  /**
   * Dispose component ref that we manually attached to the application ref
   */
  private disposeComponentRef(ref: ComponentRef<unknown>): void {
    this.appRef.detachView(ref.hostView);
    ref.destroy();
  }

  /**
   * Updates styles and classes on host element.
   * @param hostElement HTMLElement to which overlay and dialog will be added.
   */
  private updateHostElement(hostElement: HTMLElement): void {
    hostElement.classList.add('dialog-container-host');
  }

  /**
   * Removes styles and classes from container element.
   * @param hostElement HTMLElement which needs to be cleared.
   */
  private clearHostElement(hostElement: HTMLElement): void {
    hostElement.classList.remove('dialog-container-host');
  }
}

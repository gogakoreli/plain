import { Component, inject, OnInit } from '@angular/core';
import { DialogService } from '@plain/public-api';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

@Component({
  selector: 'demo-dialog-page',
  templateUrl: './dialog-page.component.html',
  styleUrls: ['./dialog-page.component.scss']
})
export class DialogPageComponent implements OnInit {

  private dialogService = inject(DialogService);

  constructor() { }

  ngOnInit() {
  }

  public openConfirmation(): void {
    this.dialogService.openConfirmation({
      data: {
        title: 'Confirm save changes!',
        messages: ['Do you want to confirm dialog?'],
        primaryButtonText: 'Confirm',
        primaryButtonClasses: ['btn btn-primary'],
        secondaryButtonText: 'Cancel',
        secondaryButtonClasses: ['btn btn-danger'],
      }
    })
  }

  public onEnterUsername(): void {
    this.dialogService.open(DialogContentComponent, {
      // closeOnBackdropClick: false,
      // closeTimeout: 2000,
    }).afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

import { Component, inject } from '@angular/core';
import { DialogService } from '@plain/public-api';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private dialogService = inject(DialogService);

  ngOnInit(): void {
    // this.dialogService.openConfirmation({
    //   data: {
    //     messages: ['Do you want to confirm dialog?'],
    //     primaryButtonText: 'Confirm',
    //     secondaryButtonText: 'Cancel',
    //   }
    // })
  }

  public onEnterUsername(): void {
    this.dialogService.open(DialogContentComponent, {}).afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

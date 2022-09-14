import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@plain/public-api';

@Component({
  selector: 'demo-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit {

  public form = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  public dialogRef = inject(DialogRef);

  constructor() { }

  ngOnInit() {
  }

  public onSubmit(): void {
    const formValue = this.form.getRawValue();
    this.dialogRef.close(formValue);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

}

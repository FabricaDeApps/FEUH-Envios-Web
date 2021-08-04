import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm',
  template: `<h1 matDialogTitle class="mb-05">{{ data.title }}</h1>
    <div mat-dialog-content class="mb-1">{{ data.message }}</div>
    <button 
    mat-raised-button
    color="primary" 
    (click)="dialogRef.close(true)">OK</button>`,
})
export class AppAlertComponent {
  constructor(
    public dialogRef: MatDialogRef<AppAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}
}
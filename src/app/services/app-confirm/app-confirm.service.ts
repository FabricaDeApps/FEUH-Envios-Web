import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

import { AppComfirmComponent } from './app-confirm.component';
import { AppAlertComponent } from './app-alert.component';

interface confirmData {
  title?: string,
  message?: string
}

@Injectable()
export class AppConfirmService {

  constructor(private dialog: MatDialog) { }

  public confirm(data:confirmData = {}): Observable<boolean> {
    data.title = data.title || '';
    data.message = data.message || 'Are you sure?';
    let dialogRef: MatDialogRef<AppComfirmComponent>;
    dialogRef = this.dialog.open(AppComfirmComponent, {
      width: '380px',
      disableClose: true,
      data: {title: data.title, message: data.message}
    });
    return dialogRef.afterClosed();
  }


  public alert(data:confirmData = {}): Observable<boolean> {
    data.title = data.title || '';
    data.message = data.message || 'Are you sure?';
    let dialogRef: MatDialogRef<AppAlertComponent>;
    dialogRef = this.dialog.open(AppAlertComponent, {
      width: '340px',
      disableClose: true,
      data: {title: data.title, message: data.message}
    });
    return dialogRef.afterClosed();
  }


}
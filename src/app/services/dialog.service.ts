import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogMedidas } from './dialogs/dialog-medidas.component';
import { map, take } from 'rxjs/operators';
import { DialogHelpComponent } from './dialogs/dialog-help/dialog-help.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  dialogRef: MatDialogRef<DialogMedidas>;
  dialogHelpRef: MatDialogRef<DialogHelpComponent>;

  constructor(private dialog: MatDialog) { }

  public openMedidas(options) {
    this.dialogRef = this.dialog.open(DialogMedidas, {width: '350px', data: options});
  }

  public confirmedMedidas(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
      return res;
    }
  ));
  }

  public openHelp(type) {
    console.log(type);
    this.dialogHelpRef = this.dialog.open(DialogHelpComponent, {width: '250px', data: type});
  }
}

import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-del-form',
  templateUrl: './edit-del-form.component.html',
  styleUrls: ['./edit-del-form.component.scss']
})
export class EditDelFormComponent implements OnInit {
  @Input() dataAv: Date;
  @Output() action: EventEmitter<any> = new EventEmitter<any>();
  confirm: boolean;
  returnAction: any = [];
  edit = false;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  executeEdit() {
    console.log('Editar');
    this.returnAction.operation = 'Edit';
    this.returnAction.execute = true;
    this.action.emit(this.returnAction);
    this.edit = true;
  }

  cancelEdit() {
    this.returnAction.operation = 'Edit';
    this.returnAction.execute = false;
    this.action.emit(this.returnAction);
    this.edit = false;
  }

  saveEdit() {
    this.returnAction.operation = 'Save';
    this.returnAction.execute = true;
    this.action.emit(this.returnAction);
    this.edit = false;
  }

  openConfirmDialog() {
    console.log(this.dataAv);
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '250px',
      data: {dataAv: this.dataAv}
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? this.confirm = true : this.confirm = false;
      this.returnAction.operation = 'Delete';
      this.returnAction.execute = this.confirm;
      this.action.emit(this.returnAction);
    });
  }
}



@Component({
  selector: 'app-confirm-dialog',
  templateUrl: 'confirmDeleteDialog.html',
})
// tslint:disable-next-line: component-class-suffix
export class ConfirmDeleteDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data
    ) {
      console.log(data.dataAv);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { MenuService } from 'src/app/services/menu.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-componente-postural',
  templateUrl: './componente-postural.component.html',
  styleUrls: ['./componente-postural.component.scss']
})
export class ComponentePosturalComponent implements OnInit {
  addForm = false;
  studentId: number;
  maxPointer = -1;
  pointer = -1;
  oldData: any = [];
  newData: any = [];
  data: string;



  constructor(private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe,
              private menuService: MenuService,
              private actRoute: ActivatedRoute,
              private dialog: MatDialog
  ) {
    this.studentId = this.actRoute.snapshot.params.id;
    this.getData();
  }

  getData() {
    this.dataService.getData('clients/post/' + this.studentId).subscribe(
      (resp: any[]) => {
        this.maxPointer = resp.length;
        if (this.maxPointer > 0) {
          this.oldData = resp;
          this.pointer = this.maxPointer - 1;
        } else {
          this.newData.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
      }
    );
  }


  ngOnInit(): void {
  }


  goBack() {
    this.location.back();
  }

  addDataForm() {
    this.newData.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    this.addForm = true;
  }

  saveDataForm(form) {
    console.table(form.value);
    this.dataService.setData('clients/post/' + this.studentId, form.value).subscribe(
      resp => {
        console.log(resp);
        this.getData();
      }
    );
    this.addForm = false;
  }

  closeInputs() {
    this.newData = [];
    this.addForm = false;
  }

  openDialog(type): void {
    const dialogRef = this.dialog.open(DialogPosturalHelp, {
      width: '250px',
      data: {type}
    });

  }


}

/* HELP DIALOG  */
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-postural-help',
  templateUrl: 'dialog-postural-help.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogPosturalHelp {
  help: any = [];
  constructor(
    public dialogRef: MatDialogRef<DialogPosturalHelp>,
    @Inject(MAT_DIALOG_DATA) public data,
    private dataService: DataService
    ) {
      this.dataService.getData('help/' + data.type).subscribe(
        resp => {
          if (resp[0]) {
            this.help = resp[0];
          } else {
            this.help.info = 'Não existe informação!.';
          }
        }
      );
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

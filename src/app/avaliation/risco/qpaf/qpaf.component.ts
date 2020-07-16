import { Component, OnInit, OnDestroy } from '@angular/core';
import {Location} from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-qpaf',
  templateUrl: './qpaf.component.html',
  styleUrls: ['./qpaf.component.scss']
})
export class QPAFComponent implements OnInit, OnDestroy {
  student: any = [];
  id: number;
  formS: any = [];
  constructor(private location: Location,
              private dataService: DataService,
              private router: Router,
              public dialog: MatDialog
              ) {
    this.id = JSON.parse(sessionStorage.selectedStudent).id;
    this.dataService.getData('clients/parq/' + this.id).subscribe(
      resp => {
        if (resp[0]) {
          this.student = resp[0];
        } else {
          this.student.codigo = this.id;
        }
      }
    );
   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.dataService.setData('clients/parq/' + this.id, this.formS).subscribe(
      resp => {
        console.log(resp);
      }
    );
  }

  goBack() {
    this.location.back();
  }

  save(form) {
    this.formS = form;
    if (Object.values(form).includes('1')) {
      this.openDialog();
    } else {
      this.router.navigate(['/rdc']);
    }
  }

  calcRisco(form) {
    this.formS = form;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogParq);
    dialogRef.afterClosed().subscribe(
      resp => this.router.navigate(['/rdc'])
    );
  }

}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-parq',
  templateUrl: 'dialog-parq.html',
})
  export class DialogParq {

}

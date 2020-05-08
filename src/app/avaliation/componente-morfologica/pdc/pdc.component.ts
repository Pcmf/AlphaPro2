import { Component, OnInit, Inject } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';


@Component({
  selector: 'app-pdc',
  templateUrl: './pdc.component.html',
  styleUrls: ['./pdc.component.scss']
})
export class PDCComponent implements OnInit {
  addPerim = false;
  addDiam = false;
  addOutros = false;
  studentId: number;
  maxPointer = -1;
  pointer = -1;
  medidas: any = [];
  newPerimetros: any = [];
  newDiametros: any = [];
  newOutros: any = [];
  selectedTab = 0;

  constructor(private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe,
              private dialogService: DialogService
  ) {
    this.studentId = JSON.parse(sessionStorage.selectedStudent).id;
    this.getData();
  }

  getData() {
    this.dataService.getData('clients/corporal/' + this.studentId).subscribe(
      (resp: any[]) => {
        this.maxPointer = resp.length;
        if (this.maxPointer > 0) {
          this.medidas = resp;
          this.pointer = this.maxPointer - 1;
        } else {
          this.newPerimetros.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
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

  addPerimetros() {
    this.newPerimetros.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    this.addPerim = true;
  }

  savePerimetros(form) {
    console.table(form.value);
    this.dataService.saveData('clients/corporal/' + this.studentId, form.value).subscribe(
      resp => {
        console.log(resp);
        this.getData();
      }
    );
    this.addPerim = false;
  }

  closeInputPerimetros() {
    this.newPerimetros = [];
    this.addPerim = false;
  }


  addDiametros() {
    this.newDiametros.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    this.addDiam = true;
  }

  saveDiametros(form) {
    console.table(form.value);
    this.dataService.saveData('clients/corporal/' + this.studentId, form.value).subscribe(
      resp => {
        console.log(resp);
        this.getData();
      }
    );
    this.addDiam = false;
  }
  closeInputDiametros() {
    this.newDiametros = [];
    this.addDiam = false;
  }


  addOutrosPerimetros() {
    this.newOutros.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    this.addOutros = true;
  }

  saveOutrosPerimetros(form) {
    console.table(form.value);
    this.dataService.saveData('clients/corporal/' + this.studentId, form.value).subscribe(
      resp => {
        console.log(resp);
        this.getData();
      }
    );
    this.addOutros = false;
  }

  closeInputOutros() {
    this.newOutros = [];
    this.addOutros = false;
  }

  swipeLeft(event) {
    if (this.selectedTab < 3) {
      this.selectedTab++;
    }
  }
  swipeRight(event) {
    if (this.selectedTab > 0) {
      this.selectedTab--;
    }
  }

  // Help Dialog
  openDialog(type): void {
    this.dialogService.openHelp(type);
  }
}

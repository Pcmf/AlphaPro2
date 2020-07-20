import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-goniometro',
  templateUrl: './goniometro.component.html',
  styleUrls: ['./goniometro.component.scss']
})
export class GoniometroComponent implements OnInit {

  panelOpenState = false;
  evaluation: any = [];
  addMesure = false;
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  selectedStudent: any = [];
  selectedTab = 0;
  protocolo = 39;

  constructor(private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe,
              public dialogService: DialogService
               ) {
    this.selectedStudent = JSON.parse(sessionStorage.selectedStudent);
    this.getData();
  }

  getData() {
    this.dataService.getData('clients/flex/' + this.selectedStudent.id + '/'  + this.protocolo).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.pointer = this.maxPointer - 1;
        } else {
          this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
      }
    );
   }

  ngOnInit(): void {
  }
  addMesures() {
    this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    this.addMesure = true;
  }
  closeInputs() {
    this.newEvaluation = [];
    this.addMesure = false;
  }

  saveMesures(form) {
    console.table(form);
    form.protocolo = this.protocolo;
    this.dataService.setData('clients/flex/' + this.selectedStudent.id, form).subscribe(
      resp => {
        this.newEvaluation = [];
        this.addMesure = false;
        this.getData();
      }
    );
  }

  goBack() {
    this.location.back();
  }

  addMesureuation() {
    this.newEvaluation.data = this.datapipe.transform( Date(), 'yyyy-MM-dd');
    this.addMesure = true;
  }

  swipeLeft(event) {
    if (this.selectedTab < 2) {
      this.selectedTab++;
    }
  }
  swipeRight(event) {
    if (this.selectedTab > 0) {
      this.selectedTab--;
    }
  }
  closeInput() {
    this.newEvaluation = [];
    this.addMesure = false;
  }

    // Help Dialog
    openDialog(type): void {
      this.dialogService.openHelp(type);
    }

}


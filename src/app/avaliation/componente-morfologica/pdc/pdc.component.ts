import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { MenuService } from 'src/app/services/menu.service';
import { ActivatedRoute } from '@angular/router';

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


  constructor(private location: Location,
              private dataService: DataService,
              private datapipe: DatePipe,
              private menuService: MenuService,
              private actRoute: ActivatedRoute
  ) {
    this.studentId = JSON.parse(sessionStorage.selectedStudent).id;
    this.getData();
  }

  getData() {
    this.dataService.getData('clients/morfo/medidas/' + this.studentId).subscribe(
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
    this.dataService.saveData('clients/morfo/medidas/' + this.studentId, form.value).subscribe(
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
    this.dataService.saveData('clients/morfo/medidas/' + this.studentId, form.value).subscribe(
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
    this.dataService.saveData('clients/morfo/medidas/' + this.studentId, form.value).subscribe(
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

}

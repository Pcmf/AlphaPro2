import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Location, DatePipe } from '@angular/common';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-im',
  templateUrl: './im.component.html',
  styleUrls: ['./im.component.scss']
})
export class IMComponent implements OnInit {

  evaluation: any = [];
  pointer = -1;
  maxPointer = -1;
  newEvaluation: any = [];
  student: any = [];
  locale: string;

  constructor(
    private location: Location,
    private dataService: DataService,
    private datapipe: DatePipe,
    private dialogService: DialogService
  ) {
    this.locale = this.dataService.getCountryId();
    this.student = JSON.parse(sessionStorage.selectedStudent);
    this.getData();
  }
  getData() {
    this.dataService.getData('clients/eval/' + this.student.id).subscribe(
      (resp: any[]) => {
        if (resp && resp.length > 0) {
          this.maxPointer = resp.length;
          this.evaluation = resp;
          this.pointer = this.maxPointer - 1;
        } else {
          this.newEvaluation.data = this.datapipe.transform(Date(), 'yyyy-MM-dd');
          this.pointer = -1;
        }
      }
    );
  }

  ngOnInit(): void {
  }
  // Help Dialog
  openDialog(type): void {
    this.dialogService.openHelp(type);
  }

  goBack() {
    this.location.back();
  }

}

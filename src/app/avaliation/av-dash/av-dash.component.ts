import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-av-dash',
  templateUrl: './av-dash.component.html',
  styleUrls: ['./av-dash.component.scss']
})
export class AvDashComponent implements OnInit {
  /* selectedStudent: any = []; */
  panelOpenState = false;
  /* studentId: number; */

  constructor(private dataService: DataService, private actRoute: ActivatedRoute) {
/*     this.studentId = this.actRoute.snapshot.params.id;
    this.dataService.getData('clients/entity/' + this.dataService.getPTId() + '/' + this.studentId).subscribe(
      resp => {
        if (resp) {
          this.selectedStudent = resp[0];
        }
      }
    ); */
  }

  ngOnInit(): void {
  }

}

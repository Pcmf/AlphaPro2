import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-reg-dash',
  templateUrl: './reg-dash.component.html',
  styleUrls: ['./reg-dash.component.scss']
})
export class RegDashComponent implements OnInit {
  studentId: number;
  selectedStudent: any = [];


  constructor(private actRoute: ActivatedRoute, private dataService: DataService) {
    this.studentId = this.actRoute.snapshot.params.id;
    this.dataService.getData('clients/entity/' + this.dataService.getPTId() + '/' + this.studentId).subscribe(
      resp => {
        this.selectedStudent = resp[0];
      }
    );

  }

  ngOnInit(): void {

  }

}

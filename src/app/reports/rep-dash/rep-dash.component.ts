import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rep-dash',
  templateUrl: './rep-dash.component.html',
  styleUrls: ['./rep-dash.component.scss']
})
export class RepDashComponent implements OnInit {

  selectedStudent: any = [];

  constructor(private dataService: DataService, private actRoute: ActivatedRoute) {
    const studentId = this.actRoute.snapshot.params.id;
    this.dataService.getData('clients/entity/' + this.dataService.getPTId() + '/' + studentId).subscribe(
      resp => {
        this.selectedStudent = resp[0];
      }
    );
  }

  ngOnInit(): void {
  }

}

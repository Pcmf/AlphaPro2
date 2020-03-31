import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flex-dash',
  templateUrl: './flex-dash.component.html',
  styleUrls: ['./flex-dash.component.scss']
})
export class FlexDashComponent implements OnInit {

  studentId: number;

  constructor(private location: Location, private actRoute: ActivatedRoute) {
    this.studentId = this.actRoute.snapshot.params.id;
   }

  ngOnInit(): void {
  }



  goBack() {
    this.location.back();
  }

}

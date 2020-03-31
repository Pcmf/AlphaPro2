import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-cc',
  templateUrl: './cc.component.html',
  styleUrls: ['./cc.component.scss']
})
export class CCComponent implements OnInit {
  panelOpenState = false;
  studentId: number;

  constructor(private dataService: DataService, private actRoute: ActivatedRoute, private location: Location) {
    this.studentId = this.actRoute.snapshot.params.id;
    console.log(this.studentId);
  }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

}

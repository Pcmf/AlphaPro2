import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
@Component({
  selector: 'app-dexa',
  templateUrl: './dexa.component.html',
  styleUrls: ['./dexa.component.scss']
})
export class DEXAComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }
  goBack() {
    this.location.back();
  }
}

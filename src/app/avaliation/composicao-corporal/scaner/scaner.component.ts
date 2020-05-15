import { Component, OnInit } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
@Component({
  selector: 'app-scaner',
  templateUrl: './scaner.component.html',
  styleUrls: ['./scaner.component.scss']
})
export class ScanerComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }
  goBack() {
    this.location.back();
  }
}

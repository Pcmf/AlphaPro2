import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-av-dash',
  templateUrl: './av-dash.component.html',
  styleUrls: ['./av-dash.component.scss']
})
export class AvDashComponent implements OnInit {
  morfoExpanded = false;

  constructor() {

  }

  ngOnInit(): void {
    if (sessionStorage.morfoExpanded) {
      this.morfoExpanded = sessionStorage.morfoExpanded;
    } else {
      sessionStorage.morfoExpanded = false;
    }
  }

  changeMorfoExpanded() {
    this.morfoExpanded = !this.morfoExpanded;
    sessionStorage.morfoExpanded = this.morfoExpanded;
  }

}

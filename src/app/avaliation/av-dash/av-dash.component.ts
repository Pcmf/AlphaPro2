import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-av-dash',
  templateUrl: './av-dash.component.html',
  styleUrls: ['./av-dash.component.scss']
})
export class AvDashComponent implements OnInit {
  morfoExpanded = false;
  videoExpanded = false;

  constructor() {

  }

  ngOnInit(): void {
    if (sessionStorage.morfoExpanded) {
      this.morfoExpanded = sessionStorage.morfoExpanded;
    } else {
      sessionStorage.morfoExpanded = false;
    }
    if (sessionStorage.videoExpanded) {
      this.videoExpanded = sessionStorage.videoExpanded;
    } else {
      sessionStorage.videoExpanded = false;
    }
  }

  changeMorfoExpanded() {
    this.morfoExpanded = !this.morfoExpanded;
    sessionStorage.morfoExpanded = this.morfoExpanded;
  }

  changeVideoExpanded() {
    this.videoExpanded = !this.videoExpanded;
    sessionStorage.videoExpanded = this.videoExpanded;
  }

}

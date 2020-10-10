import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-av-dash',
  templateUrl: './av-dash.component.html',
  styleUrls: ['./av-dash.component.scss']
})
export class AvDashComponent implements OnInit, OnDestroy {
  morfoExpanded = false;
  videoExpanded = false;
  isLoged: boolean;
  studentName: string;

  constructor(
    private dataService: DataService
  ) {
    this.studentName = JSON.parse(sessionStorage.selectedStudent).nome;
    this.dataService.morfoExpanded.subscribe(
      resp => this.morfoExpanded = resp
    );
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void { 
    this.dataService.changeDobrasExp(false);
  }

  changeMorfoExpanded() {
    this.dataService.changeMorfoExp(!this.morfoExpanded);
  }



  changeVideoExpanded() {
    this.videoExpanded = !this.videoExpanded;
    sessionStorage.videoExpanded = this.videoExpanded;
  }

}

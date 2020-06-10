import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.scss']
})
export class MetronomeComponent implements OnInit {
  bmp = 40;
  playing = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.scss']
})


export class MetronomeComponent implements OnInit {
  bpm: number;
  playing = false;
  fill1 = 'fill1';
  fill2 = 'fill2';
  tempo: any;
  audio = new Audio();


  private interval: number;
  private timer: any;
  private cron: any;
  cronTime = 180;
  constructor(
    private location: Location,
  ) {
        const student = JSON.parse(sessionStorage.selectedStudent);
        this.audio.src = './assets/sounds/tok.mp3';
        if (student.sexo === 'M') {
          this.bpm = 96;
        } else {
          this.bpm = 88;
        }
        this.interval = 60000 / this.bpm;
   }


  ngOnInit() {}




    start(): void {
        this.tick();
        this.playing = true;
        this.cronTime = 180;
        this.audio.load();
    }

    stop() {
        clearTimeout(this.timer);
        clearTimeout(this.cron);
        this.playing  = false;
        this.fill1 = 'fill1';
        this.fill2 = 'fill2';
    }


    private tick() {
        if (this.fill1) {
          this.fill1 = '';
          this.fill2 = 'fill2';
          this.audio.play();

        } else {
          this.fill1 = 'fill1';
          this.fill2 = '';
          this.audio.play();
        }
        this.timer = setTimeout(this.tick.bind(this), this.interval);
        this.cron = setTimeout(() => {
          this.cronTime--;
          if (this.cronTime === 0) {
            this.stop();
          }
        }, 1000);
    }

  goBack() {
    this.location.back();
  }




}

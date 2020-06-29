import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  selectedVideo = 'assets/videos/export.Mobile/'
  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.selectedVideo += decodeURI(this.route.snapshot.params.video);
  }

  goBack() {
    this.location.back();
  }

}

import { Component, OnInit } from '@angular/core';
import { Videos } from 'src/app/interfaces/videos.interface';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
  videos: Array<Videos> = [];

  constructor() {}

  ngOnInit(): void {
    this.getVideos();
  }

  private getVideos = () => {
    this.videos = [
      {
        id: Math.random(),
        title: 'Hello World! Video 1',
      },
      {
        id: Math.random(),
        title: 'Video 2',
      },
      {
        id: Math.random(),
        title: 'Video 3',
      },
    ];
  };
}

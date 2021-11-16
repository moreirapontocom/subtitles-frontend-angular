import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
  videos: Array<any> = [];
  videosImutable: Array<any> = [];
  filterStatus: string = 'all';

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.getVideos();
  }

  private getVideos = () => {
    this.videoService.getVideos().subscribe((response: any) => {
      this.videos = response.data;
      this.videosImutable = response.data;
    });
  };

  filterJobsByStatus = () => {
    this.videos = (this.filterStatus === 'all') ?
      this.videosImutable :
      this.videosImutable.filter((item) => item.status === this.filterStatus);
  }
}

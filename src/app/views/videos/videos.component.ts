import { Component, OnInit } from '@angular/core';
import { HelpersService } from 'src/app/helpers/helpers';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
})
export class VideosComponent implements OnInit {
  loading: boolean = false;
  videos: Array<any> = [];
  videosImutable: Array<any> = [];
  filterStatus: string = 'all';

  constructor(
    private videoService: VideoService,
    public readonly helpers: HelpersService,
  ) {}

  ngOnInit(): void {
    this.getVideos();
  }

  private getVideos = () => {
    this.loading = true;
    this.videoService.getVideos().subscribe((response: any) => {
      this.videos = response.data;
      this.videosImutable = response.data;
      this.loading = false;
    });
  };

  filterJobsByStatus = () => {
    this.videos = (this.filterStatus === 'all') ?
      this.videosImutable :
      this.videosImutable.filter((item) => item.status === this.filterStatus);
  }
}

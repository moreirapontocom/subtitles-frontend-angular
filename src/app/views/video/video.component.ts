import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  video: any;
  timer: any;
  isVideoPlaying: boolean = false;
  @ViewChild('player') player: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCurrentRoute();
  }

  playVideo = () => {
    this.player.playVideo();
    this.isVideoPlaying = true;
  }

  pauseVideo = () => {
    this.player.pauseVideo();
    this.isVideoPlaying = false;
  }

  isTyping = () => {
    if (this.isVideoPlaying) {
      this.pauseVideo();
    }

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!this.isVideoPlaying) {
        this.playVideo();
      }
    }, 700);
  }

  private getCurrentRoute(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.getVideo(params.id);
    });
  }

  getVideo = (videoId: number): void => {
    this.videoService.getVideoById(videoId).subscribe((response: any) => {
      this.video = response.data;
    });
  };

  save = (formData: any) => {
    this.videoService
      .updateVideo(this.video.id, formData)
      .subscribe((response: any) => {
        console.log(response);
      });
  };

  deleteVideo = () => {
    this.videoService.deleteVideo(this.video.id).subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['/videos']);
    });
  };
}

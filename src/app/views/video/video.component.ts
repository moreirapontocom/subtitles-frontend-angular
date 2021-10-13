import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  video: any;
  isVideoPlaying: boolean = false;
  @ViewChild('player') player: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
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
    console.log('typing');
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

  // fullscreen = () => {
    // const elem = this.playerVimeo.nativeElement;
    // if (elem.requestFullscreen) {
    //   elem.requestFullscreen();
    // } else if (elem.msRequestFullscreen) {
    //   elem.msRequestFullscreen();
    // } else if (elem.mozRequestFullScreen) {
    //   elem.mozRequestFullScreen();
    // } else if (elem.webkitRequestFullscreen) {
    //   elem.webkitRequestFullscreen();
    // }
  // };

  // playVideo = () => {
  //   console.log('PLAY no video');
  //   // this.videoPlayer.nativeElement.src = 'https://www.youtube.com/embed/2_FJrmft3uQ';
  //   this.videoPlayer.nativeElement.src =
  //     'https://player.vimeo.com/external/614439487.hd.mp4?s=f43d687271ef9f62c2cf0c4996e8dca74d4e1fd1&profile_id=175';
  //   // this.videoPlayer.nativeElement.src = this.video.url;
  //   // console.log(this.video.url)
  //   const _this = this;
  //   setTimeout(() => {
  //     _this.videoPlayer.nativeElement.play();
  //   }, 10);
  // };
}

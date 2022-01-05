import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpersService } from 'src/app/helpers/helpers';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  user: any;
  video: any;
  timer: any;
  loading: boolean = false;
  isVideoPlaying: boolean = false;
  pauseWhileTyping: boolean = true;
  @ViewChild('player') player: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
    private router: Router,
    private authService: AuthService,
    public readonly helpers: HelpersService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getCurrentRoute();
    this.removeCurrentVideoStorage();
  }

  private getUser(): void {
    this.user = this.authService.getUser();
  }

  private removeCurrentVideoStorage = () => {
    localStorage.removeItem('videoIDs');
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
    if (this.isVideoPlaying && this.pauseWhileTyping) {
      this.pauseVideo();
    }

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!this.isVideoPlaying && this.pauseWhileTyping) {
        this.playVideo();
      }
    }, 700);
  }

  copyToClipboard = (text: string) => {
    this.helpers.copyToClipboard(text);
    this.messageService.toast('Copiado para a Área de Transferência');
  }

  private getCurrentRoute(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.getVideo(params.id);
    });
  }

  getVideo = (videoId: number): void => {
    this.loading = true;
    this.videoService.getVideoById(videoId).subscribe((response: any) => {
      this.video = response.data;
      this.canConsultantUpdateVideo();
      this.loading = false;
    });
  };

  canConsultantUpdateVideo = (): boolean => {
    return (this.helpers.isConsultant() && this.user.id === this.video.consultant_id) ? true : false;
  }

  publishTo = (service: string = 'youtube') => {
    this.video.status = '4published';
    this.save({ status: '4published' });

    /*
    const youtubeAccessToken = localStorage.getItem('youtubeAccessToken');
    if (youtubeAccessToken) {

      fetch(`https://youtube.googleapis.com/youtube/v3/captions?part=snippet&key=${environment.youtubeApiKey}`, {
          method: "POST",
          body: JSON.stringify({
            snippet: {
              language: 'es',
              name: 'Spanish captions',
              videoId: this.video.youtube_id,
              isDraft: true,
            },
          }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(youtubeAccessToken)}`
          }
        })
          .then(response => response.text())
          .then((result: any) => {
            console.log('result mandou pro Youtube >> ', result);
          }).catch(error => {
            console.log('error mandou pro Youtube >> ', error);
          });
    }
    */
  }

  // Start capture
  startCaptions = () => {
    this.videoService.captureVideo(this.video.id, this.user.id).subscribe((response: any) => {
      this.video.consultant_id = this.user.id;
      this.video.status = '2in_progress';
      this.messageService.toast('Captura iniciada');
    });
  }

  // Release capture
  releaseVideo = () => {
    this.videoService.releaseCapture(this.video.id).subscribe((response: any) => {
      this.video.consultant_id = null;
      this.video.status = '0created';
      this.messageService.toast('Vídeo liberado');
    });
  }

  save = (formData: any) => {
    if (this.helpers.isConsultant() && formData.status === '4published') {
      this.messageService.toast('Você não pode salvar um vídeo no status selecionado');
      return;
    }

    this.loading = true;
    this.videoService
      .updateVideo(this.video.id, formData)
      .subscribe(() => {
        this.loading = false;
        this.messageService.toast('Atualizado');
      });
  };

  deleteVideo = () => {
    this.videoService.deleteVideo(this.video.id).subscribe((response: any) => {
      this.messageService.toast('Vídeo removido');
      this.router.navigate(['/panel/videos']);
    });
  };

  // redirectToYoutubeCaptionsFetch = () => {
  //   localStorage.setItem('videoIDs', JSON.stringify({ videoId: this.video.id, youtubeVideoId: this.video.video_id }));
  //   this.router.navigate(['/videos/caption-request']);
  // };
}

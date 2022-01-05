import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelpersService } from 'src/app/helpers/helpers';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { VideoService } from 'src/app/services/video.service';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'app-submit-video',
  templateUrl: './submit-video.component.html',
  styleUrls: ['./submit-video.component.scss'],
})
export class SubmitVideoComponent implements OnInit {
  user: any;
  loading: boolean = false;
  loadingPreview: boolean = false;
  newVideoPreview: any = undefined;
  youtubeAccessToken: string = "";
  youtubeCaption: string = "";

  constructor(
    private videoService: VideoService,
    private youtubeService: YoutubeService,
    private readonly authService: AuthService,
    private readonly helpers: HelpersService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  // https://gist.github.com/moreirapontocom/15df44a9344fd57e273351da264d7666

  ngOnInit(): void {
    this.getUser();
  }

  private getUser = (): void => {
    this.user = this.authService.getUser();
  }

  getVideoPreview = async (videoUrl: string) => {
    this.loadingPreview = true;
    const youtube = await this.youtubeService
      .getVideoSnippetFromYoutubeVideoUrl(videoUrl)
      .then((r) => r);

      this.newVideoPreview = {
        cover: youtube.snippet.thumbnails.high.url,
        title: this.helpers.emojiRemover(youtube.snippet.title),
        url: videoUrl,
        video_id: youtube.id,
        channel_id: youtube.snippet.channelId,
        channel_title: youtube.snippet.channelTitle,
      };
      this.loadingPreview = false;
  }

  submitVideo = async (formData: any) => {
    this.loading = true;
    const data = {
      owner: this.user.id,
      cover: this.newVideoPreview.cover,
      title: this.newVideoPreview.title,
      url: this.newVideoPreview.url,
      video_id: this.newVideoPreview.video_id,
      language_original: formData.languages.lang_original,
      language_target: formData.languages.lang_target,
      channel_id: this.newVideoPreview.channel_id,
      channel_title: this.newVideoPreview.channel_title,
    };

    this.newVideoPreview = data;

    this.videoService.createVideo(data).subscribe((response: any) => {
      this.loading = false;
      this.messageService.toast('Vídeo enviado com sucesso!');
      this.router.navigate(['/panel/videos', response.data.id]);
    });
  };
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpersService } from 'src/app/helpers/helpers';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { VideoService } from 'src/app/services/video.service';
import { YoutubeService } from 'src/app/services/youtube.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-submit-video',
  templateUrl: './submit-video.component.html',
  styleUrls: ['./submit-video.component.scss'],
})
export class SubmitVideoComponent implements OnInit {
  user: any;
  loading: boolean = false;
  loadingPreview: boolean = false;
  loadingYoutubeConnect: boolean = false;
  newVideoPreview: any = undefined;
  youtubeAccessToken: string = "";
  isYoutubeConnected: boolean = false;
  youtubeCaptionsFound: boolean = false;
  youtubeFetchedAutoCaption: any = undefined;
  storageFormNewVideo: string = "new_video_submit";
  storageYoutubeAccessToken: string = "youtube_access_token";

  newVideo: any = {
    url: "",
    lang_original: "",
    lang_target: "",
  };

  constructor(
    private videoService: VideoService,
    private youtubeService: YoutubeService,
    private readonly authService: AuthService,
    private readonly helpers: HelpersService,
    private router: Router,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
  ) {}

  // https://gist.github.com/moreirapontocom/15df44a9344fd57e273351da264d7666

  ngOnInit(): void {
    this.getUser();
    this.reFillForm();
    this.getYoutubeAccessTokenFragment();
  }

  private reFillForm(): void {
    const isFormFilled = localStorage.getItem(this.storageFormNewVideo);
    if (isFormFilled) {
      const formFilled = JSON.parse(isFormFilled);
      this.newVideoPreview = formFilled.preview;
      this.newVideo = formFilled.inputs;
    }
  }

  private getYoutubeAccessTokenFragment = () => {
    this.activatedRoute.fragment.subscribe((fragment: any) => {
      if (fragment && this.newVideoPreview) {
        this.youtubeAccessToken = fragment.split('&access_token=')[1].split('&')[0];
        localStorage.setItem(this.storageYoutubeAccessToken, JSON.stringify(this.youtubeAccessToken));
        fetch(`https://youtube.googleapis.com/youtube/v3/captions?part=snippet&videoId=${this.newVideoPreview.video_id}&key=${environment.youtubeApiKey}`, {
          method: 'GET',
          redirect: 'follow'
        }).then(response => response.text())
          .then(result => {
            const captions = JSON.parse(result);
            this.isYoutubeConnected = true;
            if (captions.items.length > 0) {
              this.youtubeCaptionsFound = true;
              this.isYoutubeConnected = true;
              // Here it's possible to get multiple captions
              // For now, we'll just get the first one
              this.getCaptionFromYoutube(captions.items[0].id);
            }
          })
        .catch(error => console.log('error', error));
      }
    });
  }

  private getCaptionFromYoutube = (captionId: string) => {
    fetch(`${environment.api}/youtube-get-caption`, {
      method: "POST",
      body: JSON.stringify({
      accessToken: this.youtubeAccessToken,
      captionId
    }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.text()).then((result: any) => {
      // @TODO: Validate if user has access to fetch captions
      if (result) {
        this.youtubeFetchedAutoCaption = JSON.parse(result)
          .replace(/([0-9]{1,2}\:[0-9]{1,2}\:[0-9]{1,2}\.[0-9]{3}(\,)?)/gm, "") // Remove timestamps
          .replace(/^\s*[\r\n]/gm, "\r\n") // Replace multiple empty lines by one empty line
          .replace(/^\s*[\r\n]/, ""); // Remove first empty line
        this.messageService.toast("Legenda encontrada e adicionada ao vídeo!");
      }
    }).catch(error => console.log('error', error));
  }

  // Open Youtube authentication page
  youtubeOAuthSignIn = () => {
    this.loadingYoutubeConnect = true;
    if (this.newVideoPreview) {
      localStorage.setItem(this.storageFormNewVideo, JSON.stringify({
        preview: this.newVideoPreview,
        inputs: {
          url: this.newVideoPreview.url,
          lang_original: this.newVideo.lang_original,
          lang_target: this.newVideo.lang_target
        }
      }));
    }

    let form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', 'https://accounts.google.com/o/oauth2/v2/auth');

    // Parameters to pass to OAuth 2.0 action.
    const params: any = {
      client_id: environment.youtubeApiClientId,
      redirect_uri: `${environment.client}/panel/submit-video`,
      response_type: 'token',
      scope: 'https://www.googleapis.com/auth/youtube.force-ssl',
      include_granted_scopes: 'true',
      state: 'pass-through value'
    };

    for (let p in params) {
      let input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
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
      const redirectToBase: string = "/panel/videos";
      const messageSuccess = "Vídeo enviado com sucesso!";
      localStorage.removeItem(this.storageFormNewVideo);

      if (!this.youtubeFetchedAutoCaption) {
        this.messageService.toast(messageSuccess);
        this.router.navigate([redirectToBase, response.data.id]);
        return;
      }

      this.videoService.updateVideo(response.data.id, { subtitles: this.youtubeFetchedAutoCaption, using_youtube_captions: true }).subscribe(() => {
        this.messageService.toast(messageSuccess);
        this.router.navigate([redirectToBase, response.data.id]);
      });
    });
  };
}

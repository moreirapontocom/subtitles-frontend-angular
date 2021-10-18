import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-youtube-caption-fetch',
  templateUrl: './youtube-caption-fetch.component.html',
  styleUrls: ['./youtube-caption-fetch.component.scss']
})
export class YoutubeCaptionFetchComponent implements OnInit {

  youtubeAccessToken: string = "";
  caption: string = "";
  videoId: number = 0; // Local video ID
  youtubeVideoId: string = ""; // Youtube Video ID: https://www.youtube.com/watch?v=<video_id>

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
  ) { }

  ngOnInit(): void {
    this.getYoutubeAccessTokenFragment();
  }

  private getCurrentVideoIDs = () => {
    const storageVideoId = localStorage.getItem('videoIDs');
    if (storageVideoId) {
      const IDs = JSON.parse(storageVideoId);

      this.videoId = parseInt(IDs.videoId);
      this.youtubeVideoId = IDs.youtubeVideoId;
    }
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
    })
      .then(response => response.text())
      .then((result: any) => {

        if (result) {

          /**
           * Captions response:
           * 
           * 0:00:01.100,0:00:07.700
           * Line 1
           * Line 2
           * 
           * 0:00:07.700,0:00:12.380
           * Line 1
           * Line 2
           */

          const capturedCaption = JSON.parse(result)
            .replace(/([0-9]{1,2}\:[0-9]{1,2}\:[0-9]{1,2}\.[0-9]{3}(\,)?)/gm, "") // Remove timestamps
            .replace(/^\s*[\r\n]/gm, "\r\n") // Replace multiple empty lines by one empty line
            .replace(/^\s*[\r\n]/, ""); // Remove first empty line

          this.caption = capturedCaption;
        }
      })
      .catch(error => console.log('error', error));
  }

  private getYoutubeAccessTokenFragment = () => {
    this.activatedRoute.fragment.subscribe((fragment: any) => {
      if (fragment) {
        this.getCurrentVideoIDs();

        this.youtubeAccessToken = fragment.split('&access_token=')[1].split('&')[0];
        // localStorage.setItem('youtubeAccessToken', JSON.stringify(this.youtubeAccessToken));

        fetch(`https://youtube.googleapis.com/youtube/v3/captions?part=snippet&videoId=${this.youtubeVideoId}&key=${environment.youtubeApiKey}`, {
          method: 'GET',
          redirect: 'follow'
        })
          .then(response => response.text())
          .then(result => {
            const captions = JSON.parse(result);
            this.getCaptionFromYoutube(captions.items[0].id); // Passar apenas o ID 0 aqui
          })
          .catch(error => console.log('error', error));
      }
    });
  }

  youtubeOAuthSignIn = () => {
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    var form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    const params: any = {
      client_id: environment.youtubeApiClientId,
      redirect_uri: `${environment.client}/videos/caption-request`,
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

  useCaption = () => {
    this.videoService
      .updateVideo(this.videoId, { subtitles: this.caption })
      .subscribe(() => {
        this.router.navigate(['/videos/', this.videoId]);
      });
  }

  returnToVideoWithoutUsingCapturedCaption = () => {
    this.router.navigate(['/videos/', this.videoId]);
  }

}

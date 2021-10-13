import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'app-submit-video',
  templateUrl: './submit-video.component.html',
  styleUrls: ['./submit-video.component.scss'],
})
export class SubmitVideoComponent implements OnInit {
  constructor(
    private videoService: VideoService,
    private youtubeService: YoutubeService
  ) {}

  ngOnInit(): void {}

  submitVideo = async (formData: any) => {
    const youtube = await this.youtubeService
      .getVideoSnippetFromYoutubeVideoUrl(formData.url)
      .then((r) => r);

    const data = {
      cover: youtube.snippet.thumbnails.high.url,
      title: youtube.snippet.title,
      url: formData.url,
      video_id: youtube.id,
      language_original: 'br',
      language_target: 'br',
      channel_id: youtube.snippet.channelId,
      channel_title: youtube.snippet.channelTitle,
    };
    this.videoService.createVideo(data).subscribe((response: any) => {
      console.log(response);
    });
  };
}

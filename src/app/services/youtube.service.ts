import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor() {}

  /**
   * @param youtubeVideoUrl
   * @returns object
   * {
   *     etag: "5dkbQ_vPnxAm0eaaWc3u_HaRJQY"
   *     id: "QH2-TGUlwu4"
   *     kind: "youtube#video"
   *     snippet: {
   *         categoryId: "24"
   *         channelId: "UC3VHfy8e1jbDnT5TG2pjP1w"
   *         channelTitle: "Nyan Cat"
   *         defaultAudioLanguage: "zxx"
   *         description: "For PJ.↵↵↵Adopt an official Nyan Cat NFT today! 🐈🏳️‍🌈✨ http://nyancatcollection.com / https://opensea.io/collection/nyan-cat-officia…"
   *         liveBroadcastContent: "none"
   *         localized: {title: "Nyan Cat [original]", description: "For PJ.↵↵↵Adopt an official Nyan Cat NFT today! 🐈…UTAU http://momolabo.lolipop.jp/nyancatsong/Nyan/"}
   *         publishedAt: "2011-04-06T03:30:29Z"
   *         thumbnails: {
   *             default: {url: "https://i.ytimg.com/vi/QH2-TGUlwu4/default.jpg", width: 120, height: 90}
   *             high: {url: "https://i.ytimg.com/vi/QH2-TGUlwu4/hqdefault.jpg", width: 480, height: 360}
   *             medium: {url: "https://i.ytimg.com/vi/QH2-TGUlwu4/mqdefault.jpg", width: 320, height: 180}
   *             standard: {url: "https://i.ytimg.com/vi/QH2-TGUlwu4/sddefault.jpg", width: 640, height: 480}
   *         }
   *         title: "Nyan Cat [original]"
   *     }
   *     kind: "youtube#videoListResponse"
   *     pageInfo: {totalResults: 1, resultsPerPage: 1}
   * }
   */
  getVideoSnippetFromYoutubeVideoUrl = (youtubeVideoUrl: string) => {
    const videoId = youtubeVideoUrl.split('v=')[1];

    return fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${environment.youtubeApiKey}`
    )
      .then((res) => res.json())
      .then((json) => { const item = json.items[0]; return { id: item.id, snippet: item.snippet }});
  };
}

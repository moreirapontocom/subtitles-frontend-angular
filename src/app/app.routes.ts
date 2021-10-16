import { LoginComponent } from './views/login/login.component';
import { SubmitVideoComponent } from './views/submit-video/submit-video.component';
import { VideoComponent } from './views/video/video.component';
import { VideosComponent } from './views/videos/videos.component';
import { YoutubeCaptionFetchComponent } from './views/youtube-caption-fetch/youtube-caption-fetch.component';

export const ROUTES = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'videos/caption-request', component: YoutubeCaptionFetchComponent },
  { path: 'videos/:id', component: VideoComponent },
  { path: 'submit-video', component: SubmitVideoComponent },
];

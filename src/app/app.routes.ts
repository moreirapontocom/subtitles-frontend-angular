import { LoggedInGuard } from './services/loggedin.guard';
import { LoginComponent } from './views/login/login.component';
import { SubmitVideoComponent } from './views/submit-video/submit-video.component';
import { VideoComponent } from './views/video/video.component';
import { VideosComponent } from './views/videos/videos.component';
import { YoutubeCaptionFetchComponent } from './views/youtube-caption-fetch/youtube-caption-fetch.component';

export const ROUTES = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'panel',
    canActivate: [LoggedInGuard],
    children: [
      { path: 'videos', component: VideosComponent },
      { path: 'videos/caption-request', component: YoutubeCaptionFetchComponent },
      { path: 'videos/:id', component: VideoComponent },
      { path: 'submit-video', component: SubmitVideoComponent },
    ]
  },
];

import { LoginComponent } from './views/login/login.component';
import { VideoComponent } from './views/video/video.component';
import { VideosComponent } from './views/videos/videos.component';

export const ROUTES = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'videos/:id', component: VideoComponent },
];

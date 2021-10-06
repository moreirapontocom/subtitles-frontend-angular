import { VideoComponent } from './views/video/video.component';
import { VideosComponent } from './views/videos/videos.component';

export const ROUTES = [
  { path: '', redirectTo: 'videos', pathMatch: 'full' },
  { path: 'videos', component: VideosComponent },
  { path: 'videos/:id', component: VideoComponent },
];

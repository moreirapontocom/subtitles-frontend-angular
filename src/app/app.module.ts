import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { VideosComponent } from './views/videos/videos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ROUTES } from './app.routes';
import { VideoComponent } from './views/video/video.component';
import { LoginComponent } from './views/login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { VideoService } from './services/video.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { SubmitVideoComponent } from './views/submit-video/submit-video.component';
import { YoutubeService } from './services/youtube.service';
import { YoutubeCaptionFetchComponent } from './views/youtube-caption-fetch/youtube-caption-fetch.component';
import { TruncatePipe } from './helpers/truncate.pipe';
import { JobStatusPipe } from './helpers/jobStatus.pipe';
import { AcronymComponent } from './components/acronym/acronym.component';

@NgModule({
  declarations: [
    AppComponent,
    VideosComponent,
    NavbarComponent,
    VideoComponent,
    LoginComponent,
    SubmitVideoComponent,
    YoutubeCaptionFetchComponent,
    TruncatePipe,
    JobStatusPipe,
    AcronymComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { scrollPositionRestoration: 'enabled' }),
    YouTubePlayerModule,
  ],
  providers: [
    AuthService,
    UserService,
    VideoService,
    YoutubeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

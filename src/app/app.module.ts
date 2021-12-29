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
import { FooterComponent } from './components/footer/footer.component';
import { ComposeUserFullNamePipe } from './helpers/composeUserFullName.pipe';
import { HelpersService } from './helpers/helpers';
import { VideoItemComponent } from './components/video-item/video-item.component';
import { ToastComponent } from './components/toast/toast.component';
import { MessageService } from './services/message.service';
import { LoadingComponent } from './components/loading/loading.component';
import { LoggedInGuard } from './services/loggedin.guard';
import { ProfileComponent } from './views/profile/profile.component';

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
    FooterComponent,
    ComposeUserFullNamePipe,
    VideoItemComponent,
    ToastComponent,
    LoadingComponent,
    ProfileComponent,
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
    HelpersService,
    MessageService,
    LoggedInGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

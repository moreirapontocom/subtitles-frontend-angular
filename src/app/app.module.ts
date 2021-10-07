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

@NgModule({
  declarations: [
    AppComponent,
    VideosComponent,
    NavbarComponent,
    VideoComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { scrollPositionRestoration: 'enabled' }),
  ],
  providers: [
    AuthService,
    UserService,
    VideoService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

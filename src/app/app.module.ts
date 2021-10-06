import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { VideosComponent } from './views/videos/videos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ROUTES } from './app.routes';
import { VideoComponent } from './views/video/video.component';

@NgModule({
  declarations: [
    AppComponent,
    VideosComponent,
    NavbarComponent,
    VideoComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { scrollPositionRestoration: 'enabled' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

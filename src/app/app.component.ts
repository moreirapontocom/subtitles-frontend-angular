import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    // If user is authenticated and refresh the page, start the refresher token counter
    if (this.authService.getUser()) {
      this.authService.autoRefreshUserSession();
      return;
    }

    // If user is NOT authenticated and login, wait for the login message to start the refresher token counter
    this.messageService.getMessage().subscribe((message: any) => {
      if (message.target === 'AppComponent') {
        if (message.action === "auto-refresh") {
          this.authService.autoRefreshUserSession();
        }
        if (message.action === "clear-auto-refresh") {
          this.authService.clearAutoRefreshUserSession();
        }
      }
    });
  }
}

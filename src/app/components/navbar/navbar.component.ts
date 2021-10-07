import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.messageService.getMessage().subscribe((message: any) => {
      if (message.target === 'NavbarComponent') {
        if (message.action === "login") {
          this.login(message.payload);
        }
      }
    });
  }

  login = (payload: any): void => {
    this.user = payload;
  };

  logout = (): void => {
    this.user = null;
    this.authService.removeUser();
    this.router.navigate(['/login']);
  };
}

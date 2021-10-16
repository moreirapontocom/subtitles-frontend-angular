import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {}

  private getUserProfile = (authData: any) => {
    this.userService
      .getUserProfile(authData.data.access_token)
      .subscribe((response: any) => {
        const user = { ...authData.data, ...response.data };
        this.authService.setUser(user);
        this.messageService.sendMessage('NavbarComponent', 'login', user);
        this.router.navigate(['/videos']);
      }, err => {
        console.log('Error getUserProfile() >> ', err);
      });
  };

  login = (form: any) => {
    this.authService.login(form).subscribe((response: any) => {
      this.getUserProfile(response);
    }, err => {
      console.log('Error login() >> ', err);
    });
  };
}

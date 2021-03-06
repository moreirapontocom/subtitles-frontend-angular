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
  loading: boolean = false;

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
        this.messageService.sendMessage('AppComponent', 'auto-refresh');
        this.router.navigate(['/panel/videos']);
      }, err => {
        console.log('Error getUserProfile() >> ', err);
      });
  };

  login = (form: any) => {
    this.loading = true;
    this.authService.login(form).subscribe((response: any) => {
      this.loading = false;
      this.getUserProfile(response);
    }, err => {
      this.loading = false;
      this.messageService.toast('Ocorreu um erro ao efetuar o login.');
      console.log('Error login() >> ', err);
    });
  };
}

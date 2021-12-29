import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.user = this.authService.getUser();
  }

  updateUserProfile(formData: any): void {
    formData.id = this.user.id;
    this.loading = true;
    this.userService.updateUserProfile(formData).subscribe((response) => {
      this.loading = false;
      const userProfile = { ...this.user, ...response.data };
      this.authService.setUser(userProfile);
      this.messageService.sendMessage('NavbarComponent', 'login', userProfile);
      this.messageService.sendMessage('AcronymComponent', 'update', userProfile);
      this.messageService.toast('Perfil atualizado');
    });
  }

}

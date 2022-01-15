import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  user: any;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.messageService.getMessage().subscribe((message: any) => {
      if (message.target === 'NavbarComponent') {
        if (message.action === "login") {
          this.getUser();
        }
      }
    });
  }

  private getUser() {
    this.user = this.authService.getUser();
  }

}

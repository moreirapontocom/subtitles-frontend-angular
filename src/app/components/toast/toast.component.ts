import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  messages: Array<string> = [];
  sub: any;

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.sub = this.messageService.getMessage().subscribe((response: any) => {
      if (response.target=='ToastComponent') {
        this.handleMessage(response);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  handleMessage(message: any) {
    if (message.action=='toast') {
      this.messages.unshift(message.payload);
      var _messages = this.messages;
      var timer = setInterval(function() {
        _messages.splice((_messages.length - 1), 1);
        clearInterval(timer);
      }, 6000);
    }
  }

  closeThis(index: any) {
    this.messages.splice(index, 1);
  }

}

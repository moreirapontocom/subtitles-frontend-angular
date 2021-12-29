import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-acronym',
  templateUrl: './acronym.component.html',
  styleUrls: ['./acronym.component.scss'],
})
export class AcronymComponent implements OnInit {
  acronym: string = '';
  @Input() color: string = '#ccc';
  @Input() fgColor: string = '#333';
  @Input() value: string = '';
  @Input() hide: boolean = false;

  constructor(
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getAcronym();
    this.messageService.getMessage().subscribe((message: any) => {
      if (message.target === 'AcronymComponent') {
        if (message.action === 'update') {
          this.value =  (message.payload.last_name.length) ? `${message.payload.first_name} ${message.payload.last_name}` : message.payload.first_name;
          this.getAcronym();
        }
      }
    });
  }

  private getAcronym = (): void => {
    const displayValue = this.value.indexOf(' ') >= 0
      ? this.value.split(' ')[0][0] + this.value.split(' ')[1][0]
      : this.value.substring(0, 2);
    this.acronym = displayValue.toUpperCase();
  };
}

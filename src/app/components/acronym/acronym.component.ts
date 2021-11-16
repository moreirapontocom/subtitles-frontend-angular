import { Component, Input, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {
    this.getAcronym();
  }

  private getAcronym = (): void => {
    const displayValue = this.value.indexOf(' ') >= 0
      ? this.value.split(' ')[0][0] + this.value.split(' ')[1][0]
      : this.value.substring(0, 2);
    this.acronym = displayValue.toUpperCase();
  };
}

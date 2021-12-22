import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent implements OnInit {

  @Input() video: any;
  @Input () hasLink: boolean = false;
  @Input () hasStatus: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements AfterViewInit {
  latitude: number = 19.4978;
  longitude: number = -99.1269;
  zoom: number = 8;
  ngAfterViewInit() {}
}

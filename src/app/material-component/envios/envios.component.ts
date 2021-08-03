import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.scss']
})
export class EnviosComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {
    
  }
  latitude: number = 19.4978;
  longitude: number = -99.1269;
  zoom: number = 8;
  ngAfterViewInit() {}
}

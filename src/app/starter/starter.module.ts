import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StarterComponent } from './starter.component';
import { StarterRoutes } from './starter.routing';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(StarterRoutes), 
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCYrqOD6OHpyvKRANgP0-887NA_B25aSq4',
      libraries: ['places']
    })     
  ],
  declarations: [StarterComponent]
})
export class StarterModule {}

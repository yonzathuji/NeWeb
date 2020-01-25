import { Component } from '@angular/core';
import { Location } from 'projects/cesium-map/src/lib/models/location';
import { CesiumMapService } from 'projects/cesium-map/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly INITIAL_LOCATION: Location = {
    west: 31.0,
    south: 29.0,
    east: 35.0,
    north: 35.0
  };

  readonly MAX_ZOOM_IN = 20000;
  readonly MAX_ZOOM_OUT = 1500000;

  constructor() { }

}

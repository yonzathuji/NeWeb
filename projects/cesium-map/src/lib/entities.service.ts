import { Injectable } from '@angular/core';
import { CesiumMapService } from './cesium-map.service';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  constructor(
    private cesiumMapService: CesiumMapService
  ) {
    this.cesiumMapService.viewerReady.subscribe(() => {

    });
  }
}

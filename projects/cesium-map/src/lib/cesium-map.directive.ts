import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CesiumMapService } from './cesium-map.service';
import { Location } from './models/location';

@Directive({
  selector: '[libCesiumMap]',
  exportAs: 'libCesiumMap'
})
export class CesiumMapDirective implements OnInit {
  @Input() initialLocation: Location;
  @Input() set maxZoomIn(value: number) {
    this.cesiumMapService.cesiumViewerInitilized().finally(
      () => this.cesiumMapService.MAX_ZOOM_IN = value);
  }
  @Input() set maxZoomOut(value: number) {
    this.cesiumMapService.cesiumViewerInitilized().finally(
      () => this.cesiumMapService.MAX_ZOOM_OUT = value);
  }

  constructor(
    private elementRef: ElementRef,
    private cesiumMapService: CesiumMapService) {
  }

  ngOnInit() {
    this.cesiumMapService.initCesiumViewer(this.elementRef, this.initialLocation);
  }

}

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
    this.cesiumMapService.maxZoomIn = value;
  }

  @Input() set maxZoomOut(value: number) {
    this.cesiumMapService.maxZoomOut = value;
  }

  constructor(
    private elementRef: ElementRef,
    private cesiumMapService: CesiumMapService
  ) {
  }

  ngOnInit() {
    this.cesiumMapService.initCesiumViewer(this.elementRef, this.initialLocation);
  }
}

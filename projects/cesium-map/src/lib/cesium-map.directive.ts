import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[libCesiumMap]'
})
export class CesiumMapDirective implements OnInit {
  private cesiumViewer: any;

  constructor(private el: ElementRef) {
    console.log('helolo');
  }

  ngOnInit() {
    this.cesiumViewer = new Cesium.Viewer(this.el.nativeElement, {
      sceneMode: Cesium.SceneMode.SCENE2D,
      animation: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      homeButton: false,
      infoBox: false,
      sceneModePicker: false,
      geocoder: false,
      timeline: false,
      selectionIndicator: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      clockViewModel: null,
      imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
      }),
    });
  }

}

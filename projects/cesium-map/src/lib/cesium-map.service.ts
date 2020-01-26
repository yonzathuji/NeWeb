import { ElementRef, Injectable, NgZone } from '@angular/core';
import { ImageryLayer } from 'cesium';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { Location } from './models/location';
import { MapFeature } from './models/map-feature';

@Injectable({
  providedIn: 'root'
})
export class CesiumMapService {

  private cesiumViewer: any;
  private imageryLayers = new Map<string, ImageryLayer>();
  private maxZoomIn$ = new BehaviorSubject<number>(0);
  private maxZoomOut$ = new BehaviorSubject<number>(0);

  constructor(
    private zone: NgZone
  ) { }

  get currentZoom(): number {
    return this.cesiumViewer.camera.positionCartographic.height;
  }

  get maxZoomOut(): number {
    return this.maxZoomOut$.value;
  }

  set maxZoomOut(meters: number) {
    this.maxZoomOut$.next(meters);
  }

  get maxZoomIn(): number {
    return this.maxZoomIn$.value;
  }

  set maxZoomIn(meters: number) {
    this.maxZoomIn$.next(meters);
  }

  initCesiumViewer(
    elementRef: ElementRef, initialLocation: Location) {
    this.zone.runOutsideAngular(() => {

      if (initialLocation) {
        this.setDefaultView(initialLocation);
      }

      this.cesiumViewer = new Cesium.Viewer(elementRef.nativeElement, {
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
        clockViewModel: null
      });
    });

    this.maxZoomIn$.pipe(
      skip(1)
    ).subscribe(val => this.cesiumViewer.scene.screenSpaceCameraController.minimumZoomDistance = val);

    this.maxZoomOut$.pipe(
      skip(1)
    ).subscribe(val => this.cesiumViewer.scene.screenSpaceCameraController.maximumZoomDistance = val);
  }

  zoomIn(amount: number): void {
    if (this.currentZoom + amount <= this.maxZoomIn) {
      this.cesiumViewer.camera.zoomIn(this.maxZoomIn + amount);
      return;
    }

    this.cesiumViewer.camera.zoomIn(amount);
  }

  zoomOut(amount: number): void {
    if (this.currentZoom + amount >= this.maxZoomOut) {
      this.cesiumViewer.camera.zoomOut(this.maxZoomOut - amount);
      return;
    }

    this.cesiumViewer.camera.zoomOut(amount);
  }

  addArcGisImageryLayer(name: string, mapFeature: MapFeature): void {
    if (this.imageryLayers.has(name)) {
      return;
    }

    const imageryLayer = this.cesiumViewer.imageryLayers.addImageryProvider(
      new Cesium.ArcGisMapServerImageryProvider({
        url: mapFeature.url, layers: mapFeature.layer
      })
    );
    this.imageryLayers.set(name, imageryLayer);
  }

  removeArcGisImageryLayer(name: string): void {
    if (!this.imageryLayers.has(name)) {
      return;
    }

    const imageryLayer = this.imageryLayers.get(name);
    this.cesiumViewer.imageryLayers.remove(imageryLayer);
    this.imageryLayers.delete(name);
  }

  removeAllArcGisLayers(destroy: boolean = false): void {
    this.imageryLayers.clear();
    this.cesiumViewer.imageryLayers.removeAll(destroy);
  }

  private setDefaultView(location: Location): void {
    Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
      location.west,
      location.south,
      location.east,
      location.north
    );
  }
}

import { ElementRef, Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { skipWhile, take } from 'rxjs/operators';
import { Location } from './models/location';

@Injectable({
  providedIn: 'root'
})
export class CesiumMapService {

  private cesiumViewer: any;

  cesiumViewerInitilized$ = new BehaviorSubject<boolean>(false);

  constructor(
    private zone: NgZone
  ) { }

  get CURRENT_ZOOM(): number {
    return this.cesiumViewer.camera.positionCartographic.height;
  }

  get MAX_ZOOM_OUT(): number {
    return this.cesiumViewer.scene.screenSpaceCameraController.maximumZoomDistance;
  }

  set MAX_ZOOM_OUT(meters: number) {
    this.cesiumViewer.scene.screenSpaceCameraController.maximumZoomDistance = meters;
  }

  get MAX_ZOOM_IN(): number {
    return this.cesiumViewer.scene.screenSpaceCameraController.minimumZoomDistance;
  }

  set MAX_ZOOM_IN(meters: number) {
    this.cesiumViewer.scene.screenSpaceCameraController.minimumZoomDistance = meters;
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
        clockViewModel: null,
        imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
          url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
        }),
      });
    });

    this.cesiumViewerInitilized$.next(true);
  }

  cesiumViewerInitilized(): Promise<boolean> {
    return this.cesiumViewerInitilized$.asObservable()
      .pipe(skipWhile(ready => !ready), take(1)).toPromise();
  }

  zoomIn(amount: number): void {
    if (this.CURRENT_ZOOM + amount <= this.MAX_ZOOM_IN) {
      this.cesiumViewer.camera.zoomIn(this.MAX_ZOOM_IN + amount);
      return;
    }

    this.cesiumViewer.camera.zoomIn(amount);
  }

  zoomOut(amount: number): void {
    if (this.CURRENT_ZOOM + amount >= this.MAX_ZOOM_OUT) {
      this.cesiumViewer.camera.zoomOut(this.MAX_ZOOM_OUT - amount);
      return;
    }

    this.cesiumViewer.camera.zoomOut(amount);
  }

  private setDefaultView(location: Location) {
    Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
      location.west,
      location.south,
      location.east,
      location.north
    );
  }
}

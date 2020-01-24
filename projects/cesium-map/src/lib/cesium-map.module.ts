import { NgModule, ModuleWithProviders } from '@angular/core';
import { CesiumMapDirective } from './cesium-map.directive';
import { CesiumMapService } from './cesium-map.service';



@NgModule({
  declarations: [CesiumMapDirective],
  imports: [
  ],
  exports: [CesiumMapDirective]
})
export class CesiumMapModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CesiumMapModule,
      providers: [CesiumMapService]
    };
  }
}

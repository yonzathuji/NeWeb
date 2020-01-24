import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CesiumMapModule } from 'projects/cesium-map/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CesiumMapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

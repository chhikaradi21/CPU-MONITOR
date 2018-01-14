import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SdkService } from './sdk.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// from node modules
import { ChartModule } from 'angular2-chartjs';
import * as $ from 'jquery';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FormsModule, ChartModule, HttpModule
  ],
  providers: [SdkService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routableComponents } from './app-routing.module';

import { AppComponent } from './app.component';
import {
  MdSidenavModule,
  MdToolbarModule,
  MdListModule,
  MdGridListModule,
  MdIconModule
} from '@angular/material';

import 'hammerjs';


@NgModule({
  declarations: [
    AppComponent,
    routableComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdSidenavModule,
    MdToolbarModule,
    MdListModule,
    MdIconModule,
    MdGridListModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

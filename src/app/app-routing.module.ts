import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { WeatherService } from './weather.service';

import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'record', component: HomeComponent },
  { path: '*', component: HomeComponent }
];

/** array de componentes enrutables */
export const routableComponents = [
  HomeComponent
];

@NgModule({
  imports: [
    HttpModule,
    RouterModule.forRoot(routes) // configuración para el módulo raíz
  ],
  providers: [WeatherService],
  exports: [
    RouterModule // se importará desde el módulo padre
  ]
})
export class AppRoutingModule { }

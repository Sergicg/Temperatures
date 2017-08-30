import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

  constructor(private http: Http) {}

  getWeather(id: string) {
    return this.http.get(environment.apiUrl + '/data/2.5/weather?id=' + id + '&units=metric&appid=' + environment.apiKey).map(res=>res.json());
  }

  getWeatherIcon(id: string) {
    return this.http.get(environment.apiUrl + '/img/w/' + id + '.png').map(res=>res.json());
  }
}

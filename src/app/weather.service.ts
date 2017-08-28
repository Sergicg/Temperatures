import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

  constructor(private http: Http) {}

  getWeather(id: string) {
    return this.http.get(environment.apiUrl + id + '&units=metric&appid=' + environment.apiKey).map(res=>res.json());
  }
}

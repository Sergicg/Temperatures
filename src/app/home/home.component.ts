import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from "../weather.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  cities: any = [
    {
      id: '3435910',
      data: {
        name: 'Buenos Aires',
        country: 'AR',
        temp: '',
      },
      record: []
    },
    {
      id: '3871336',
      data: {
        name: 'Santiago',
        country: 'CL',
        temp: ''
      },
      record: []
    },
    {
      id: '3936456',
      data: {
        name: 'Lima',
        country: 'PE',
        temp: ''
      },
      record: []
    },
    {
      id: '3448439',
      data: {
        name: 'Sao Paulo',
        country: 'BR',
        temp: ''
      },
      record: []
    }
  ];

  interval = 1000 * 3 * 60;
  isRecord = false;
  isEmpty = false;
  updateInterval: any;

  constructor(private router: Router, private weather: WeatherService) {}

  ngOnInit() {

    let cache_cities = this.getHistory();
    let existCacheCities = cache_cities != undefined && cache_cities != null;

    if (existCacheCities) {
      this.cities = cache_cities;
    }

    if (this.router.url == '/record' && existCacheCities) {
      this.isRecord = true;
      this.isEmpty = false;
    } else if (this.router.url == '/record' && !existCacheCities) {
      this.isEmpty = true;
    } else {
      this.isRecord = false;
      this.getCityTemps();
    }

    this.update();
  }

  update() {
    this.updateInterval = setInterval(() => {
      console.log("updating....");
      this.getCityTemps();
      this.setHistoryCity();
    }, this.interval);
  }

  getCityTemps() {
    for (let i=0; i < this.cities.length; i++) {
      this.weather.getWeather(this.cities[i]['id']).subscribe(
        r=> {
          this.cities[i].data.temp = Math.round(r['main']['temp']);
          localStorage.setItem('last' + this.cities[i].id, JSON.stringify({'id':this.cities[i].id, 'temp':this.cities[i]['data']['temp'], 'time': new Date()}));
          if (this.isEmpty) {
            this.setHistoryCity();
            this.isEmpty = false;
          }
          if (this.isEmpty) {
            this.isEmpty = false;
          }

        }
      );
    }
  }

  setHistoryCity() {
    for (let i=0; i < this.cities.length; i++) {
      this.cities[i]['record'].push({
        time: new Date().getTime(),
        temp: this.cities[i]['data']['temp']
      });
    }
    localStorage.setItem('record', JSON.stringify(this.cities));
  }

  getHistory()  {
    return JSON.parse(localStorage.getItem('record'));
  }

  ngOnDestroy() {
    clearInterval(this.updateInterval);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from "../weather.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  cities: any = [
    {
      id: '3435910',
      data: {
        name: 'Buenos Aires',
        country: 'AR',
        temp: ''
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

  constructor(private router: Router, private weather: WeatherService) {}

  ngOnInit() {
    console.log('ngInit');
    console.log(this.router.url);

    if (this.router.url == '/record') {
      this.isRecord = true;
      let cache_cities = this.getHistory();
      if (cache_cities != undefined && cache_cities != null) {
        this.cities = cache_cities;
      } else {
        //TODO: Mostrar mensaje
        console.log("No hay historial");
      }
      console.log(this.cities);
    } else {
      this.isRecord = false;
      this.getCityTemps();
      this.update();
    }
  }

  update() {
    setInterval(() => {
      console.log("updating....");
      this.getCityTemps();
    }, this.interval);
  }

  getCityTemps() {
    for (let i=0; i < this.cities.length; i++) {
      this.weather.getWeather(this.cities[i]['id']).subscribe(
        r=> {
          this.cities[i].data.temp = r['main']['temp'];
          console.log(this.cities[i].data.temp);
          localStorage.setItem('last' + this.cities[i].id, JSON.stringify({'id':this.cities[i].id, 'temp':this.cities[i]['data']['temp'], 'time': new Date()}));
          this.setHistoryCity(this.cities[i]);
        }
      );
    }
  }

  setHistoryCity(city: any) {
    city['record'].push({
      time: new Date().getTime(),
      temp: city['data']['temp']
    });
    localStorage.setItem('record', JSON.stringify(this.cities));
  }

  getHistory()  {
    return JSON.parse(localStorage.getItem('record'));
  }

}

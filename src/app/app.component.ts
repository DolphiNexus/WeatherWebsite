import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as moment from "moment";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  private appId: string;
    private appCode: string;

    public weather: any;

    public constructor(private http: HttpClient) {
        this.appId = "8jmIcMRZ5dDIuZqi7xDy";
        this.appCode = "GsY8bsdL-liCTU0KexRlnQ";
        this.weather = [];
    }

    public ngOnInit() {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            this.getWeather(position.coords);
        });
    } else {
        console.error("The browser does not support geolocation...");
    }
     }

    public getWeather(coordinates: any) {
      this.http.jsonp("https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&latitude=" + coordinates.latitude + "&longitude=" + coordinates.longitude + "&app_id=" + this.appId + "&app_code=" + this.appCode, "jsonpCallback")
        .pipe(map(result => (<any>result).dailyForecasts.forecastLocation))
        .subscribe(result => {
            this.weather = result.forecast;
        }, error => {
            console.error(error);
        });
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeatherData } from 'src/app/models/interfaces/weather-data.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '6b955509e7ba21ecc46671a90fbc50ab';

  constructor(
    private http: HttpClient
  ) { }

  getWeatherDataByCity(cityName: string): Observable<IWeatherData> { 
    return this.http.get<IWeatherData>(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}&units=metric`
    )
  }
}

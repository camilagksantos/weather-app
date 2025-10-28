import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IWeatherData } from 'src/app/models/interfaces/weather-data.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly BFF_URL = environment.bffUrl;

  // private apiKey = '6b955509e7ba21ecc46671a90fbc50ab';

  constructor(
    private http: HttpClient
  ) { }

  getWeatherDataByCity(cityName: string): Observable<IWeatherData> {
    return this.http.get<{ success: boolean; data: IWeatherData }>(
      `${this.BFF_URL}/weather/current`,
      {
        params: {
          city: cityName
        }
      }
    ).pipe(
      map(response => response.data)
    );
  }
}

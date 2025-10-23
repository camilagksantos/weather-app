import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { IWeatherData } from 'src/app/models/interfaces/weather-data.interface';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.css']
})
export class WeatherHomeComponent implements OnInit, OnDestroy {

  initialCity: string = 'Braga';
  private readonly destroy$: Subject<void> = new Subject<void>();
  weatherData!: IWeatherData;
  searchIcon = faMagnifyingGlass;

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.getWeatherDataByCity(this.initialCity);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmitCity(): void {
    this.getWeatherDataByCity(this.initialCity);
    this.initialCity = '';
  }

  getWeatherDataByCity(cityName: string) {
    this.weatherService
      .getWeatherDataByCity(cityName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          response && (this.weatherData = response);
      }
    });
  }
}

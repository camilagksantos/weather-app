import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { WeatherService } from '../../../services/weather.service';
import { IWeatherData } from 'src/app/models/interfaces/weather-data.interface';
import { catchError, finalize, Observable, of, tap } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { WeatherErrorMessage } from 'src/app/models/enums/weather-error-message.enum';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.css']
})
export class WeatherHomeComponent implements OnDestroy{

  initialCity: string = '';
  weatherData$!: Observable<IWeatherData | null>;
  searchIcon = faMagnifyingGlass;
  isLoading: boolean = false;
  errorMessage: string = '';
  cityError: string = '';
  isWarmTheme: boolean = false;


  constructor(
    private weatherService: WeatherService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnDestroy(): void {
    document.body.classList.remove('warm-bg');
  }

  onSubmitCity(): void {
    const city = this.initialCity.trim();

    if (!city) {
      this.cityError = 'Digite o nome de uma cidade';
      return;
    }

    this.cityError = '';
    this.getWeatherDataByCity(city);
    this.initialCity = '';
  }

  getWeatherDataByCity(cityName: string) {
    this.isLoading = true;
    this.errorMessage = '';

    this.weatherData$ = this.weatherService.getWeatherDataByCity(cityName).pipe(
      tap((data) => {
        this.errorMessage = '';
        this.isWarmTheme = data.main.temp > 20;

        if (this.isWarmTheme) {
          document.body.classList.add('warm-bg');
        } else {
          document.body.classList.remove('warm-bg');
        }
      }),
      catchError((error) => {
        if (error.status === 404) {
          this.errorMessage = WeatherErrorMessage.CITY_NOT_FOUND;
        } else if (error.status === 0 || error.status >= 500) {
          this.errorMessage = WeatherErrorMessage.NETWORK_ERROR;
        } else {
          this.errorMessage = WeatherErrorMessage.GENERIC_ERROR;
        }

        this.cdr.detectChanges();
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      })
    );
  }
}

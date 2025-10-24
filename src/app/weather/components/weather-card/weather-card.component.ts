import { Component, Input } from '@angular/core';
import { faDroplet, faTemperatureDown, faTemperatureHigh, faWind } from '@fortawesome/free-solid-svg-icons';
import { IWeatherData } from 'src/app/models/interfaces/weather-data.interface';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent {

  private readonly TEMPERATURE_THRESHOLD = 20;

  readonly sunImage = 'assets/sun.jpg';
  readonly coldImage = 'assets/cold1.jpg';

  minTemperatureIcon = faTemperatureDown;
  maxTemperatureIcon = faTemperatureHigh;
  humidityIcon = faDroplet;
  windSpeedIcon = faWind;

  @Input() weatherDataHome!: IWeatherData;

  isWarmWeather(): boolean {
    return this.weatherDataHome.main.temp > this.TEMPERATURE_THRESHOLD;
  }

  getThemeClass(): string {
    return this.isWarmWeather() ? 'warm-theme' : 'cold-theme';
  }

  get weatherInfo() {
    return [
      {
        icon: this.minTemperatureIcon,
        label: 'Mínima',
        value: `${Math.round(this.weatherDataHome.main.temp_min)} °C`
      },
      {
        icon: this.maxTemperatureIcon,
        label: 'Máxima',
        value: `${Math.round(this.weatherDataHome.main.temp_max)} °C`
      },
      {
        icon: this.humidityIcon,
        label: 'Humidade',
        value: `${this.weatherDataHome.main.humidity} %`
      },
      {
        icon: this.windSpeedIcon,
        label: 'Vento',
        value: `${this.weatherDataHome.wind.speed} km/h`
      }
    ];
  }
}

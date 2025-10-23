import { Component, Input } from '@angular/core';
import { faDroplet, faTemperatureDown, faTemperatureHigh, faWind } from '@fortawesome/free-solid-svg-icons';
import { IWeatherData } from 'src/app/models/interfaces/weather-data.interface';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent {

  minTemperatureIcon = faTemperatureDown;
  maxTemperatureIcon = faTemperatureHigh;
  humidityIcon = faDroplet;
  windSpeedIcon = faWind;

  @Input() weatherDataHome!: IWeatherData;

}

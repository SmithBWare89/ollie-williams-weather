import { Component, Input } from '@angular/core';
import { ForecastCardComponent } from './forecast-card/forecast-card.component';
import { WeatherForecastType } from '../../types/shared.types';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [ForecastCardComponent],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css',
})
export class ForecastComponent {
  @Input() fiveDayForecast: WeatherForecastType[] | undefined = undefined;
}

import { Component, Input } from '@angular/core';
import { ForecastCardComponent } from './forecast-card/forecast-card.component';
import { WeatherForecastType } from '../../shared/shared.types';
import { NgForOf, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [ForecastCardComponent, NgForOf, SlicePipe],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css',
})
export class ForecastComponent {
  @Input() fiveDayForecast: WeatherForecastType[] | undefined = undefined;
}

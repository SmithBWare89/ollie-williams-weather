import { Component, Input } from '@angular/core';
import { WeatherForecastType } from '../../../shared/shared.types';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { convertDate } from '../../../shared/shared.utility';
import { WeatherIconComponent } from '../../weather-icon/weather-icon.component';

@Component({
  selector: 'app-forecast-card',
  standalone: true,
  imports: [NgIf, DatePipe, NgForOf, WeatherIconComponent],
  templateUrl: './forecast-card.component.html',
  styleUrl: './forecast-card.component.css',
})
export class ForecastCardComponent {
  @Input() forecast: WeatherForecastType | undefined = undefined;
  protected readonly convertDate = convertDate;
}

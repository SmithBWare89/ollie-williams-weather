import { Component, Input } from '@angular/core';
import { WeatherForecastType } from '../../../shared/shared.types';
import { DatePipe, NgIf } from '@angular/common';
import { convertDate } from '../../../shared/shared.utility';

@Component({
  selector: 'app-forecast-card',
  standalone: true,
  imports: [NgIf, DatePipe],
  templateUrl: './forecast-card.component.html',
  styleUrl: './forecast-card.component.css',
})
export class ForecastCardComponent {
  @Input() forecast: WeatherForecastType | undefined = undefined;
  protected readonly convertDate = convertDate;
}

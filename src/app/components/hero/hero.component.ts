import { Component, Input } from '@angular/core';
import { CurrentWeatherType } from '../../shared/shared.types';
import { CommonModule, DatePipe } from '@angular/common';
import { convertDate } from '../../shared/shared.utility';
import { WeatherIconComponent } from '../weather-icon/weather-icon.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, DatePipe, WeatherIconComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  @Input() currentForecast: CurrentWeatherType | undefined = undefined;
  @Input() loading: boolean = false;
  protected readonly convertDate = convertDate;
}

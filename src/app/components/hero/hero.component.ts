import { Component, Input } from '@angular/core';
import { CurrentWeatherType } from '../../shared/shared.types';
import { CommonModule, DatePipe } from '@angular/common';
import { convertDate } from '../../shared/shared.utility';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  @Input() currentForecast: CurrentWeatherType | undefined = undefined;
  protected readonly convertDate = convertDate;
}

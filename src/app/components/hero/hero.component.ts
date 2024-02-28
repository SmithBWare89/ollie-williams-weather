import { Component, Input } from '@angular/core';
import { CurrentWeatherType } from '../../types/shared.types';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  @Input() currentForecast: CurrentWeatherType | undefined = undefined;
}

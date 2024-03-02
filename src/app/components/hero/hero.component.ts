import { Component, Input } from '@angular/core';
import { CurrentWeatherType } from '../../types/shared.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  @Input() currentForecast: CurrentWeatherType | undefined = undefined;
}

import { Component, Input } from '@angular/core';
import { WeatherDescription } from '../../shared/shared.types';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-weather-icon',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './weather-icon.component.html',
  styleUrl: './weather-icon.component.css',
})
export class WeatherIconComponent {
  private defaultWeatherValue: WeatherDescription = {
    description: 'Cloudy with some sun',
    icon: '02d',
    iconId: 0,
    main: 'Cloudy with sun',
  };

  @Input() set weatherDescription(description: WeatherDescription | undefined) {
    this._description$.next(
      description ? description : this.defaultWeatherValue,
    );
  }

  private _description$: BehaviorSubject<WeatherDescription> =
    new BehaviorSubject<WeatherDescription>(this.defaultWeatherValue);
  public description$ = this._description$.asObservable();
}

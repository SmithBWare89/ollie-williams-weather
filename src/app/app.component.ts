import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SearchToolComponent } from './components/search-tool/search-tool.component';
import { ResultsContainerComponent } from './components/results-container/results-container.component';
import { HeroComponent } from './components/hero/hero.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  CurrentWeatherType,
  ForecastType,
  WeatherForecastType,
} from './types/shared.types';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SearchToolComponent,
    ResultsContainerComponent,
    HeroComponent,
    ForecastComponent,
    HttpClientModule,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private _currentForecast$: BehaviorSubject<CurrentWeatherType | undefined> =
    new BehaviorSubject<CurrentWeatherType | undefined>(undefined);
  public currentWeather$: Observable<CurrentWeatherType | undefined> =
    this._currentForecast$.asObservable();

  private _fiveDayForecast$: BehaviorSubject<
    WeatherForecastType[] | undefined
  > = new BehaviorSubject<WeatherForecastType[] | undefined>(undefined);
  public fiveDayForecast$: Observable<WeatherForecastType[] | undefined> =
    this._fiveDayForecast$.asObservable();
  public setForecast(forecast: ForecastType | undefined): void {
    if (!forecast) {
      this._currentForecast$.next(undefined);
      this._fiveDayForecast$.next(undefined);
      return;
    }
    this._currentForecast$.next(forecast.currentForecast);
    this._fiveDayForecast$.next(forecast?.fiveDayForecast);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  lastValueFrom,
  map,
  Observable,
  take,
} from 'rxjs';
import { ForecastType } from '../types/shared.types';

@Injectable({
  providedIn: 'any',
})
export class AppService {
  constructor(private http: HttpClient) {}

  private _currentCityData$: BehaviorSubject<ForecastType | undefined> =
    new BehaviorSubject<ForecastType | undefined>(undefined);

  public async getCity(city: string): Promise<ForecastType | undefined> {
    const url: string = `https://ollie-weather-backend-cd657e24fe9a.herokuapp.com/${city}`;
    const request$ = this.http.get(url).pipe(
      map((data) => {
        return this.toResponseType(data);
      }),
      take(1),
    );

    return await lastValueFrom<ForecastType | undefined>(request$);
  }

  private toResponseType({
    currentForecast,
    fiveDayForecast,
    latitude,
    longitude,
  }: any): ForecastType {
    return {
      currentForecast,
      fiveDayForecast,
      latitude,
      longitude,
    };
  }
}

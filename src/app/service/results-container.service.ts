import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, map, Observable, take } from 'rxjs';
import { ForecastType } from '../types/shared.types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'any',
})
export class ResultsContainerService {
  private storage: Storage = localStorage;
  private storageTitle: string = 'recentCities';
  private storedCities$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  private _currentCityData$: BehaviorSubject<ForecastType | undefined> =
    new BehaviorSubject<ForecastType | undefined>(undefined);

  constructor(private http: HttpClient) {}

  public savedSearchedCities(cities: string[]): void {
    this.storedCities$.next(cities);
    this.setCities();
  }

  public async getCityForecast(
    city: string,
  ): Promise<ForecastType | undefined> {
    return await this.setCityForecast(city);
  }

  public getSearchedCities(): string[] {
    if (!this.getStoredValue()) return this.storedCities$.value;
    this.parseStoredCities();
    return this.storedCities$.value;
  }

  private getStoredValue(): string | null {
    return this.storage.getItem(this.storageTitle);
  }

  private parseStoredCities(): void {
    const storedValue: string | string[] = JSON.parse(
      this.storage.getItem(this.storageTitle) ?? '',
    );
    // This should never be truthy as we are only going to store an array
    typeof storedValue === 'string'
      ? this.storedCities$.next([])
      : this.storedCities$.next(storedValue);
  }

  private setCities() {
    this.storage.setItem(
      this.storageTitle,
      JSON.stringify(this.storedCities$.value),
    );
  }

  private async setCityForecast(
    city: string,
  ): Promise<ForecastType | undefined> {
    const url: string = `https://ollie-weather-backend-cd657e24fe9a.herokuapp.com/${city}`;
    const request$: Observable<ForecastType> = this.http.get(url).pipe(
      map((data) => {
        return this.toResponseType(<ForecastType>data, city);
      }),
      take(1),
    );

    return await lastValueFrom<ForecastType | undefined>(request$);
  }

  private toResponseType(
    { currentForecast, fiveDayForecast, latitude, longitude }: ForecastType,
    city: string,
  ): ForecastType {
    return {
      currentForecast: { ...currentForecast, city },
      fiveDayForecast,
      latitude,
      longitude,
    };
  }
}

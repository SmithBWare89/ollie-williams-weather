import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, map, Observable, take } from 'rxjs';
import { ForecastType } from '../shared/shared.types';

@Injectable({
  providedIn: 'any',
})
export class AppService {
  private storage: Storage = localStorage;
  private storageTitle: string = 'recentCities';
  private storedCities$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  constructor(private http: HttpClient) {}
  public async setCityForecast(
    city: string,
  ): Promise<ForecastType | undefined> {
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

  public saveSearchedCities(cities: string[]): void {
    this.storedCities$.next(cities);
    this.setCities();
  }

  private getStoredValue(): string | null {
    return this.storage.getItem(this.storageTitle);
  }

  public getSearchedCities(): string[] {
    if (!this.getStoredValue()) return this.storedCities$.value;
    this.parseStoredCities();
    return this.storedCities$.value;
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
}

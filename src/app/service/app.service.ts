import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  last,
  lastValueFrom,
  map,
  Observable,
  take,
  tap,
} from 'rxjs';
import { ForecastType } from '../shared/shared.types';

@Injectable({
  providedIn: 'any',
})
export class AppService {
  private storage: Storage = localStorage;
  private storageTitle: string = 'recentCities';

  private _storedCities$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  public storedCities$: Observable<string[]> =
    this._storedCities$.asObservable();
  constructor(private http: HttpClient) {}
  public async setCityForecast(
    city: string,
  ): Promise<ForecastType | undefined> {
    const url: string = `https://ollie-weather-backend-cd657e24fe9a.herokuapp.com/${city}`;
    return await lastValueFrom(
      this.http.get(url).pipe(
        map((data): undefined | ForecastType => {
          if (!data) return undefined;
          return this.toResponseType(data);
        }),
      ),
    );
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
    this._storedCities$.next(cities);
    this.setCities();
  }

  private getStoredValue(): string | null {
    return this.storage.getItem(this.storageTitle);
  }

  public getSearchedCities(): string[] {
    if (!this.getStoredValue()) return this._storedCities$.value;
    this.parseStoredCities();
    return this._storedCities$.value;
  }

  private parseStoredCities(): void {
    const storedValue: string | string[] = JSON.parse(
      this.storage.getItem(this.storageTitle) ?? '',
    );
    // This should never be truthy as we are only going to store an array
    typeof storedValue === 'string'
      ? this._storedCities$.next([])
      : this._storedCities$.next(storedValue);
  }

  private setCities() {
    this.storage.setItem(
      this.storageTitle,
      JSON.stringify(this._storedCities$.value),
    );
  }
}

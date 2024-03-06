import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchToolComponent } from '../search-tool/search-tool.component';
import { RecentSearchComponent } from '../recent-search/recent-search.component';
import {
  BehaviorSubject,
  combineLatestWith,
  map,
  Observable,
  take,
  tap,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ForecastType } from '../../shared/shared.types';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-results-container',
  standalone: true,
  imports: [
    SearchToolComponent,
    RecentSearchComponent,
    AsyncPipe,
    HttpClientModule,
  ],
  templateUrl: './results-container.component.html',
  styleUrl: './results-container.component.css',
})
export class ResultsContainerComponent implements OnInit {
  constructor(private appService: AppService) {}

  private _storedCities$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  public storedCities$: Observable<string[]> =
    this._storedCities$.asObservable();
  private _searchedCity$: BehaviorSubject<string> = new BehaviorSubject<string>(
    '',
  );
  private searchedCity$: Observable<string> =
    this._searchedCity$.asObservable();

  private _error$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );
  public error$: Observable<boolean> = this._error$.asObservable();

  async ngOnInit(): Promise<void> {
    await this.getStoredValues();
  }

  @Output() searchedCityForecast: EventEmitter<ForecastType | undefined> =
    new EventEmitter<ForecastType | undefined>();
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();

  public async setSearchedCity(city: string): Promise<void> {
    this.loading.emit(true);
    this._error$.next(false);
    this._searchedCity$.next(city);
    const forecast: ForecastType | undefined =
      await this.appService.setCityForecast(city);
    if (!forecast) {
      this._error$.next(true);
      this.loading.emit(false);
      return;
    }
    this.storeSearchedCities();
    this.loading.emit(false);
    this.searchedCityForecast.emit(forecast);
  }

  private storeSearchedCities(): void {
    const citiesWithoutDuplicates$: Observable<string[]> =
      this.validateNoDuplicateStoredCity$();

    const trimmedCitiesList$: Observable<string[]> =
      citiesWithoutDuplicates$.pipe(
        map((cities: string[]): string[] => {
          if (cities.length > 6) {
            cities.pop();
          }
          return cities;
        }),
        take(1),
      );

    trimmedCitiesList$
      .pipe(
        tap((cities: string[]): void => {
          this.appService.saveSearchedCities(cities);
          this._storedCities$.next(this.appService.getStoredCities());
        }),
        take(1),
      )
      .subscribe();
  }

  private validateNoDuplicateStoredCity$(): Observable<string[]> {
    return this.searchedCity$.pipe(
      combineLatestWith(this.storedCities$),
      map(([city, storedCities]): string[] => {
        if (!storedCities.length) return [city];
        const hasDuplicates: boolean = storedCities.some(
          (storedCity: string): boolean => city === storedCity,
        );
        if (hasDuplicates) {
          const index: number = storedCities.indexOf(city);
          storedCities.splice(index, 1);
          storedCities.unshift(city);
          return storedCities;
        }
        storedCities.unshift(city);
        return storedCities;
      }),
      take(1),
    );
  }

  private async getStoredValues() {
    const storedValues: string[] = this.appService.getStoredCities();
    if (!storedValues.length) {
      this._storedCities$.next(storedValues);
      return;
    }
    this.loading.emit(true);
    const forecast: ForecastType | undefined =
      await this.appService.setCityForecast(storedValues[0]);
    this.loading.emit(false);
    this.searchedCityForecast.emit(forecast);
    this._storedCities$.next(storedValues);
  }
}

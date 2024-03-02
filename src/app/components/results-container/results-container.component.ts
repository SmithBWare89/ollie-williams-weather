import { Component, EventEmitter, Output } from '@angular/core';
import { SearchToolComponent } from '../search-tool/search-tool.component';
import { ResultsContainerService } from '../../service/results-container.service';
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
export class ResultsContainerComponent {
  constructor(private resultsContainerService: ResultsContainerService) {}

  private _storedCities$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >(this.resultsContainerService.getSearchedCities());
  public storedCities$: Observable<string[]> =
    this._storedCities$.asObservable();
  private _searchedCity$: BehaviorSubject<string> = new BehaviorSubject<string>(
    '',
  );
  private searchedCity$: Observable<string> =
    this._searchedCity$.asObservable();

  @Output() searchedCityForecast: EventEmitter<ForecastType | undefined> =
    new EventEmitter<ForecastType | undefined>();

  public async setSearchedCity(city: string): Promise<void> {
    this._searchedCity$.next(city);
    this.validateSearchedCity();
    this.resultsContainerService.savedSearchedCities(this._storedCities$.value);
    this.searchedCityForecast.emit(
      await this.resultsContainerService.getCityForecast(city),
    );
  }

  private validateSearchedCity(): void {
    const citiesWithoutDuplicates$: Observable<string[]> =
      this.searchedCity$.pipe(
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
          this._storedCities$.next(cities);
        }),
        take(1),
      )
      .subscribe();
  }
}

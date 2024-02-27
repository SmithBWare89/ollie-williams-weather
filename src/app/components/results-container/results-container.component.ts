import { Component } from '@angular/core';
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
import { AppService } from '../../service/app.service';
import { ForecastType } from '../../types/shared.types';

@Component({
  selector: 'app-results-container',
  standalone: true,
  imports: [SearchToolComponent, RecentSearchComponent, AsyncPipe],
  templateUrl: './results-container.component.html',
  styleUrl: './results-container.component.css',
})
export class ResultsContainerComponent {
  constructor(
    private resultsContainerService: ResultsContainerService,
    private appService: AppService,
  ) {}

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
  private _searchedCityForecast$: BehaviorSubject<ForecastType | undefined> =
    new BehaviorSubject<ForecastType | undefined>(undefined);
  public searchedCityForecast$: Observable<ForecastType | undefined> =
    this._searchedCityForecast$.asObservable();

  public async setSearchedCity(city: string): Promise<void> {
    this._searchedCity$.next(city);
    this.validateSearchedCity();
    this.resultsContainerService.storeCities(this._storedCities$.value);
    this._searchedCityForecast$.next(
      await this.appService.getCityForecast(city),
    );
    console.log(this._searchedCityForecast$.value);
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

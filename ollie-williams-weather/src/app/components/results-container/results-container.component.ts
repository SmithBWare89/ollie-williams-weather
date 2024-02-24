import { Component } from '@angular/core';
import { SearchToolComponent } from '../search-tool/search-tool.component';
import { ResultsContainerService } from './results-container.service';
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

@Component({
  selector: 'app-results-container',
  standalone: true,
  imports: [SearchToolComponent, RecentSearchComponent, AsyncPipe],
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
  private searchedCity$ = this._searchedCity$.asObservable();

  public setSearchedCity(city: string) {
    this._searchedCity$.next(city);
    this.validateSearchedCity();
    this.resultsContainerService.storeCities(this._storedCities$.value);
  }

  private validateSearchedCity(): void {
    const citiesWithoutDuplicates$: Observable<string[]> =
      this.searchedCity$.pipe(
        combineLatestWith(this.storedCities$),
        map(([city, storedCities]) => {
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
        map((cities) => {
          if (cities.length > 6) {
            cities.pop();
          }
          return cities;
        }),
        take(1),
      );

    trimmedCitiesList$
      .pipe(
        tap((cities) => {
          this._storedCities$.next(cities);
        }),
        take(1),
      )
      .subscribe();
  }
}

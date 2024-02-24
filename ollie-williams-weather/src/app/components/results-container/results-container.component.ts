import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchToolComponent } from '../search-tool/search-tool.component';
import { ResultsContainerService } from './results-container.service';
import { RecentSearchComponent } from '../recent-search/recent-search.component';
import {
  BehaviorSubject,
  combineLatestWith,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  takeUntil,
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
export class ResultsContainerComponent implements OnInit, OnDestroy {
  constructor(private resultsContainerService: ResultsContainerService) {}
  private _storedCities$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >(this.resultsContainerService.getSearchedCities());
  public storedCities$: Observable<string[]> =
    this._storedCities$.asObservable();
  private searchedCity$: Subject<string> = new Subject<string>();
  private ngOnDestroy$ = new Subject<void>();

  ngOnInit(): void {
    this.searchedCity$
      .pipe(
        distinctUntilChanged(),
        combineLatestWith(this.storedCities$),
        map(([city, storedCities]) =>
          this.checkForDuplicates(city, storedCities),
        ),
        map((cities) => this.validateLength(cities)),
        tap((cities) => {
          this._storedCities$.next(cities);
        }),
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }

  public setSearchedCity(city: string) {
    this.searchedCity$.next(city);
    this.resultsContainerService.setSearchedCity(city);
  }

  private checkForDuplicates(city: string, storedCities: string[]) {
    if (!storedCities.length) return [city];
    const hasDuplicates: boolean = storedCities.some(
      (storedCity: string): boolean => city === storedCity,
    );
    if (hasDuplicates) {
      const index: number = storedCities.indexOf(city);
      storedCities.splice(index, 1);
      storedCities.push(city);
    }
    return storedCities;
  }

  private validateLength(cities: string[]): string[] {
    if (cities.length > 6) {
      cities.pop();
    }
    return cities;
  }
}

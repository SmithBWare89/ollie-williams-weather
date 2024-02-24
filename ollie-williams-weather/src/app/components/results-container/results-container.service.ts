import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  combineLatestWith,
  filter,
  map,
  Observable,
  Subscription,
  take,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultsContainerService {
  private storage: Storage = localStorage;
  private storageTitle: string = 'recentCities';
  private storedCities$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  public storeCities(cities: string[]): void {
    this.storedCities$.next(cities);
    this.setCities();
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
}

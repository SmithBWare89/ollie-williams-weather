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

  public setSearchedCity(city: string): void {
    this.storeCity(city);
  }

  public getSearchedCities(): string[] {
    if (!this.getStoredValue()) return this.storedCities$.value;
    this.parseStoredCities();
    return this.storedCities$.value;
  }

  private storeCity(city: string): void {
    if (!this.storageExists()) {
      this.storedCities$.next([city]);
    }
    // Proceed
    this.setItems();
  }

  private getStoredValue(): string | null {
    return this.storage.getItem(this.storageTitle);
  }

  private storageExists(): boolean {
    return this.storage.hasOwnProperty(this.storageTitle);
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

  private setItems() {
    this.storage.setItem(
      this.storageTitle,
      JSON.stringify(this.storedCities$.value),
    );
  }
}

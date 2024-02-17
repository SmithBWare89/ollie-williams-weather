import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultsContainerService {
  private storage: Storage = localStorage;
  private storageTitle: string = 'recentCities';
  private storedCities$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  public setCities(value: string): void {
    this.storedCities$.next(
      this.storageExists() ? [value, ...this.storedCities$.value] : [value],
    );
    this.storeCities();
  }

  public getCities(): string[] {
    if (!this.storageExists()) return [];
    return this.parsedCities();
  }

  private storeCities(): void {
    this.storage.setItem(
      'recentCities',
      JSON.stringify(this.storedCities$.value),
    );
  }

  private storageExists(): boolean {
    return this.storageTitle in this.storage;
  }

  private parsedCities(): string[] {
    this.storedCities$.next(
      JSON.parse(this.storage.getItem(this.storageTitle)),
    );
    return this.storedCities$.value;
  }
}

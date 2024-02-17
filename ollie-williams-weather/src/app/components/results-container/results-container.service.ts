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
  public addSearchedCity(city: string): void {
    this.storeCity(city);
  }

  public retrieveSearchedCities(): string[] {
    if (!this.getStoredValue()) return this.storedCities$.value;
    this.parseCities();
    return this.storedCities$.value;
  }

  private storeCity(city: string): void {
    if (!this.storageExists()) {
      this.storedCities$.next([city]);
    } else {
    }
    this.storage.setItem(
      this.storageTitle,
      JSON.stringify(this.storedCities$.value),
    );
  }

  private getStoredValue(): string | null {
    return this.storage.getItem(this.storageTitle);
  }

  private storageExists(): boolean {
    return this.storage.hasOwnProperty(this.storageTitle);
  }

  private parseCities(): void {
    if (!this.storageExists()) {
      this.storedCities$.next([]);
      return;
    }
    const storedValue: string | string[] = JSON.parse(
      this.storage.getItem(this.storageTitle) ?? '',
    );
    typeof storedValue === 'string'
      ? this.storedCities$.next([])
      : this.storedCities$.next(storedValue);
    return;
  }
}

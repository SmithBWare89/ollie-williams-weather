import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take, tap } from 'rxjs';

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
      this.setItems();
      return;
    }
    // Parse local storage and update behavior subject with new info
    this.parseStoredCities();
    // Validate before saving
    this.validateBeforeSave(city);
    console.log(this.storedCities$.value);
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

  private validateBeforeSave(city: string) {
    const cities$: Observable<string> = this.storedCities$.pipe(
      map((cities: string[]) => this.checkForDuplicates(cities, city)),
      map((cities: string[]) => this.validateLength(cities, city)),
      take(1),
    );
  }

  private checkForDuplicates(cities: string[], city: string): string[] {
    const hasDuplicates: boolean = cities.some(
      (val: string): boolean => val === city,
    );
    if (hasDuplicates) {
      const index: number = cities.indexOf(city);
      return cities.splice(index);
    }
    return cities;
  }

  private validateLength(cities: string[], city: string): string[] {
    cities.push(city);
    if (cities.length > 6) {
      cities.pop();
    }
    return cities;
  }
}

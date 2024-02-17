import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMagnifyingGlass,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-tool',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './search-tool.component.html',
  styleUrl: './search-tool.component.css',
})
export class SearchToolComponent {
  public magnifyingGlass: IconDefinition = faMagnifyingGlass;
  private regEx: RegExp = /^[A-Za-z ]*$/g;
  private searchedCity$: BehaviorSubject<string | undefined> =
    new BehaviorSubject<string | undefined>('');
  private _error$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );
  public error$: Observable<boolean> = this._error$.asObservable();
  @Output() searchedCityEvent: EventEmitter<string> =
    new EventEmitter<string>();
  public onChange(city: string): void {
    this._error$.next(false);
    const searchedCity: string = city.trim();
    if (!this.validateSearchedCity(searchedCity)) {
      this.searchedCity$.next(undefined);
      this._error$.next(true);
      return;
    }
    this.searchedCity$.next(searchedCity);
    this.emitCity();
  }
  private emitCity(): void {
    this.searchedCityEvent.emit(this.searchedCity$.value);
  }
  private validateSearchedCity(city: string): boolean {
    return !!city.match(this.regEx);
  }
}

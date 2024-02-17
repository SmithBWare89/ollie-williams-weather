import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMagnifyingGlass,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-search-tool',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './search-tool.component.html',
  styleUrl: './search-tool.component.css',
})
export class SearchToolComponent {
  public magnifyingGlass: IconDefinition = faMagnifyingGlass;
  private regEx: RegExp = /\w+/g;
  private searchedCity$: BehaviorSubject<string | undefined> =
    new BehaviorSubject<string | undefined>(undefined);
  @Output() searchedCityEvent: EventEmitter<string | undefined> =
    new EventEmitter<string | undefined>();
  public onChange(city: string): void {
    if (this.validateSearchedCity(city)) {
      this.searchedCity$.next(city.trim());
    }
    this.searchedCity$.next(undefined);
    this.emitCity();
  }
  private emitCity(): void {
    this.searchedCityEvent.emit(this.searchedCity$.value);
  }
  private validateSearchedCity(city: string): boolean {
    return !!city.match(this.regEx);
  }
}

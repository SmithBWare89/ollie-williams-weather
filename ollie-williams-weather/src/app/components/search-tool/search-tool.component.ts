import { Component, EventEmitter } from '@angular/core';
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
  private searchedCity$: BehaviorSubject<string | undefined> =
    new BehaviorSubject<string | undefined>(undefined);
  private searchedCityEvent: EventEmitter<string> = new EventEmitter<string>();
  public onChange(city: string) {
    this.searchedCity$.next(city.trim());
    this.emitCity();
  }
  private emitCity() {
    this.searchedCityEvent.emit(this.searchedCity$.value);
  }
}

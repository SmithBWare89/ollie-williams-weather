import { Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-recent-search',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './recent-search.component.html',
  styleUrl: './recent-search.component.css',
})
export class RecentSearchComponent {
  @Input() searchedCities(cities: string[] | undefined) {
    if (!cities) return;
    this._cities$.next(cities);
  }
  private _cities$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    [],
  );
  public cities$: Observable<string[]> = this._cities$.asObservable();
}

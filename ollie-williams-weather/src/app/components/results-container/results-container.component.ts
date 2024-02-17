import { Component } from '@angular/core';
import { SearchToolComponent } from '../search-tool/search-tool.component';
import { ResultsContainerService } from './results-container.service';
import { RecentSearchComponent } from '../recent-search/recent-search.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-results-container',
  standalone: true,
  imports: [SearchToolComponent, RecentSearchComponent, AsyncPipe],
  templateUrl: './results-container.component.html',
  styleUrl: './results-container.component.css',
})
export class ResultsContainerComponent {
  constructor(private resultsContainerService: ResultsContainerService) {}
  private _storedCities$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  public storedCities$: Observable<string[]> =
    this._storedCities$.asObservable();
  private searchedCity: string = '';

  public setSearchedCity(city: string) {
    this.searchedCity = city;
  }
}
